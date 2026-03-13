using Abstracciones.Modelos.Eventos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.DA
{
    public interface IReservaEventoDA 
    {
        Task <int> CrearReservaEvento(ReservaEventoRequest reserva);
        Task <List<ReservaEventoResponse>> ObtenerReservasEmprendimiento(int emprendimientoId);
        Task <List<solicitudReservaEvento>> ObtenerSolicitudesReservaEvento();
        Task <int> AprobarReserva(int eventoId, int emprendimientoId);
        Task <int> RechazarReserva(int eventoId, int emprendimientoId);
    }
}
