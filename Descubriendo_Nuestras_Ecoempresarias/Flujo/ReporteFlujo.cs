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

        public async Task<IEnumerable<InventarioReporte>> ObtenerInventario(int emprendimientoId)
        {
            return await _reporteDA.ObtenerInventario(emprendimientoId);
        }

        public async Task<KpiNegocio> ObtenerKpi(int emprendimientoId)
        {
            return await _reporteDA.ObtenerKpi(emprendimientoId);   
        }

        public async Task<IEnumerable<ProductoBajo>> ObtenerProductosBajo(int emprendimientoId)
        {
            return await _reporteDA.ObtenerProductosBajo(emprendimientoId);
        }

        public async Task<IEnumerable<ProductoTop>> ObtenerProductosTop(int emprendimientoId)
        {
           return await _reporteDA.ObtenerProductosTop(emprendimientoId);
        }

        public async Task<IEnumerable<TicketPromedioDto>> ObtenerTicketPromedio(int emprendimientoId)
        {
            return await _reporteDA.ObtenerTicketPromedio(emprendimientoId);
        }

        public async Task<IEnumerable<TopSectorResponse>> ObtenerTopSectores()
        {
            return await _reporteDA.ObtenerTopSectores();
        }

        public async  Task<IEnumerable<VentasMensuales>> ObtenerVentasMensuales(int emprendimientoId)
        {
           return await _reporteDA.ObtenerVentasMensuales(emprendimientoId);
        }

        public async Task<IEnumerable<VentasPorSectorResponse>> ObtenerVentasPorSector()
        {
            return await _reporteDA.ObtenerVentasPorSector();
        }
    }
}
