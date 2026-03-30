using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flujo
{
    public class ReporteFlujo : IReporteFlujo
    {
        private readonly IReporteDA _reporteDA; 
        public ReporteFlujo (IReporteDA reporteDA)
        {
            _reporteDA = reporteDA;
        }
        public async Task<ActivosResponse> ObtenerActivos()
        {
            return await _reporteDA.ObtenerActivos();
        }

        public async Task<IEnumerable<CrecimientoResponse>> ObtenerCrecimiento()
        {
            return await _reporteDA.ObtenerCrecimiento();
        }

        public async Task<IEnumerable<TopSectorResponse>> ObtenerTopSectores()
        {
            return await _reporteDA.ObtenerTopSectores();
        }

        public async Task<IEnumerable<VentasPorSectorResponse>> ObtenerVentasPorSector()
        {
            return await _reporteDA.ObtenerVentasPorSector();
        }
    }
}
