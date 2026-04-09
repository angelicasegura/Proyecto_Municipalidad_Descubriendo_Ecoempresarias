using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.Servicios
{
    public interface INotificacionesService
    {
        // Notifica a todos los emprendedores activos sobre un nuevo evento
        Task NotificarNuevoEventoAsync(string nombreEvento, string fechaInicio, string fechaFin, string lugar, string descripcion);

        // Notifica al emprendedor que su solicitud fue aprobada
        Task NotificarSolicitudAprobadaAsync(int reservaId);

        // Notifica al emprendedor que su solicitud fue rechazada
        Task NotificarSolicitudRechazadaAsync(int reservaId);

        // Notifica al emprendedor que reservó un stand
        Task NotificarStandReservadoAsync(string correo, string nombreEmprendedor, string nombreEmprendimiento, string nombreEvento, string nombreZona, string codigoStand);

        // Notifica al emprendedor que su stand fue desocupado
        Task NotificarStandDesocupadoAsync(string correo, string nombreEmprendedor, string nombreEmprendimiento, string nombreEvento, string codigoStand);
    }
}