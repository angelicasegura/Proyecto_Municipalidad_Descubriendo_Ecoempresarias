using Abstracciones.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.Flujo
{
    public interface IReporteFlujo
    {
        Task<IEnumerable<VentasPorSectorResponse>> ObtenerVentasPorSector();
        Task<IEnumerable<CrecimientoResponse>> ObtenerCrecimiento();
        Task<IEnumerable<TopSectorResponse>> ObtenerTopSectores();
        Task<ActivosResponse> ObtenerActivos();
    }
}
