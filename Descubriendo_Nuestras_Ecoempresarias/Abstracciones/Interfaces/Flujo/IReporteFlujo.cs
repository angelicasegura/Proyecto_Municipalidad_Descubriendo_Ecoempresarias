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


        //Emprendimientos


        Task<KpiNegocio> ObtenerKpi(int emprendimientoId);

        Task<IEnumerable<VentasMensuales>> ObtenerVentasMensuales(int emprendimientoId);

        Task<IEnumerable<TicketPromedioDto>> ObtenerTicketPromedio(int emprendimientoId);

        Task<IEnumerable<ProductoTop>> ObtenerProductosTop(int emprendimientoId);

        Task<IEnumerable<ProductoBajo>> ObtenerProductosBajo(int emprendimientoId);

        Task<IEnumerable<InventarioReporte>> ObtenerInventario(int emprendimientoId);
    }
}
