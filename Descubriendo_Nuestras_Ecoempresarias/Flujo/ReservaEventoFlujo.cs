using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos.Eventos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flujo
{
    public class ReservaEventoFlujo : IReservaEventoFlujo
    {
        private readonly IReservaEventoDA _reservaEventoDA;
       public ReservaEventoFlujo(IReservaEventoDA reservaEventoDA)
        {
            _reservaEventoDA = reservaEventoDA;
        }
        public async Task<int> AprobarReserva(int Reserva_id)
        {
            return await _reservaEventoDA.AprobarReserva(Reserva_id);
        }

        public async Task<int> CrearReservaEvento(ReservaEventoRequest reserva)
        {
            return await _reservaEventoDA.CrearReservaEvento(reserva);
        }

        public async Task<List<ReservaEventoResponse>> ObtenerReservasEmprendimiento(int emprendimientoId)
        {
            return await _reservaEventoDA.ObtenerReservasEmprendimiento(emprendimientoId);
        }

        public async Task<List<solicitudReservaEvento>> ObtenerSolicitudesReservaEvento()
        {
            return await _reservaEventoDA.ObtenerSolicitudesReservaEvento();
        }

        public async Task<int> RechazarReserva(int Reserva_id)
        {
            return await _reservaEventoDA.RechazarReserva(Reserva_id);
        }

        public async Task<bool> TieneReservaAceptada(int emprendimiento_id, int evento_id)
        {
            return await _reservaEventoDA.TieneReservaAceptada(emprendimiento_id, evento_id);
        }
    }
}
