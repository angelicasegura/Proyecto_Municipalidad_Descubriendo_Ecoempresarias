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
        public async Task<int> AprobarReserva(int eventoId, int emprendimientoId)
        {
            return await _reservaEventoDA.AprobarReserva(eventoId, emprendimientoId);
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

        public async Task<int> RechazarReserva(int eventoId, int emprendimientoId)
        {
            return await _reservaEventoDA.RechazarReserva(eventoId, emprendimientoId);
        }
    }
}
