using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Servicios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flujo.EmaiService
{
    public class NotificacionService : INotificacionesService
    {
        private readonly IEmailService _emailService;
        private readonly IEmprendimientoDA _emprendimientoDA;
        private readonly IReservaEventoDA _reservaEventoDA;

        public NotificacionService(
            IEmailService emailService,
            IEmprendimientoDA emprendimientoDA,
            IReservaEventoDA reservaEventoDA)
        {
            _emailService = emailService;
            _emprendimientoDA = emprendimientoDA;
            _reservaEventoDA = reservaEventoDA;
        }

        // ─── 1. Nuevo evento → todos los emprendedores activos ──────
        public async Task NotificarNuevoEventoAsync(
            string nombreEvento,
            string fechaInicio,
            string fechaFin,
            string lugar,
            string descripcion)
        {
            var emprendedores = await _emprendimientoDA.ObtenerEmprendimientosActivos();

            var tareas = emprendedores
                .Where(e => !string.IsNullOrWhiteSpace(e.Email))
                .Select(e =>
                {
                    var cuerpo = EmailTemplates.NuevoEvento(
                        nombreEmprendedor: e.NombreDuenio ?? e.Nombre,
                        nombreEvento: nombreEvento,
                        fechaInicio: fechaInicio,
                        fechaFin: fechaFin,
                        lugar: lugar,
                        descripcion: descripcion
                    );
                    return _emailService.SendEmailAsync(
                        e.Email,
                        $"📢 Nuevo evento: {nombreEvento}",
                        cuerpo
                    );
                });

            await Task.WhenAll(tareas);
        }

        // ─── 2. Solicitud aprobada ───
        public async Task NotificarSolicitudAprobadaAsync(int reservaId)
        {
            var reserva = await _reservaEventoDA.ObtenerReservaPorId(reservaId);
            if (reserva == null || string.IsNullOrWhiteSpace(reserva.Correo)) return;

            var cuerpo = EmailTemplates.SolicitudAprobada(
                nombreEmprendedor: reserva.Nombre,
                nombreEmprendimiento: reserva.NombreEmprendimiento,
                nombreEvento: reserva.NombreEvento, 
                fechaInicio: "Ver en la plataforma",
                lugar: "Ver en la plataforma"
            );

            await _emailService.SendEmailAsync(
                reserva.Correo,
                "✅ Tu solicitud fue aprobada",
                cuerpo
            );
        }

        // ─── 3. Solicitud rechazada ───
        public async Task NotificarSolicitudRechazadaAsync(int reservaId)
        {
            var reserva = await _reservaEventoDA.ObtenerReservaPorId(reservaId);
            if (reserva == null || string.IsNullOrWhiteSpace(reserva.Correo)) return;

            var cuerpo = EmailTemplates.SolicitudRechazada(
                nombreEmprendedor: reserva.Nombre,
                nombreEmprendimiento: reserva.NombreEmprendimiento,
                nombreEvento: reserva.NombreEvento
            );

            await _emailService.SendEmailAsync(
                reserva.Correo,
                "❌ Actualización sobre tu solicitud de evento",
                cuerpo
            );
        }

        // ─── 4. Stand reservado ───────────────────────────────────────────────
        public async Task NotificarStandReservadoAsync(
            string correo,
            string nombreEmprendedor,
            string nombreEmprendimiento,
            string nombreEvento,
            string nombreZona,
            string codigoStand)
        {
            if (string.IsNullOrWhiteSpace(correo)) return;

            var cuerpo = EmailTemplates.StandReservado(
                nombreEmprendedor,
                nombreEmprendimiento,
                nombreEvento,
                nombreZona,
                codigoStand
            );

            await _emailService.SendEmailAsync(
                correo,
                $"🪧 Stand {codigoStand} reservado — {nombreEvento}",
                cuerpo
            );
        }

        // ─── 5. Stand desocupado ─────────
        public async Task NotificarStandDesocupadoAsync(
            string correo,
            string nombreEmprendedor,
            string nombreEmprendimiento,
            string nombreEvento,
            string codigoStand)
        {
            if (string.IsNullOrWhiteSpace(correo)) return;

            var cuerpo = EmailTemplates.StandDesocupado(
                nombreEmprendedor,
                nombreEmprendimiento,
                nombreEvento,
                codigoStand
            );

            await _emailService.SendEmailAsync(
                correo,
                $"🔓 Reserva cancelada — Stand {codigoStand}",
                cuerpo
            );
        }
    }
}