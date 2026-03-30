using Abstracciones.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.DA
{
    public interface IReporteDA
    {
        Task<IEnumerable<VentasPorSectorResponse>> ObtenerVentasPorSector();
        Task<IEnumerable<CrecimientoResponse>> ObtenerCrecimiento();
        Task<IEnumerable<TopSectorResponse>> ObtenerTopSectores();
        Task<ActivosResponse> ObtenerActivos();
    }
}
