using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DA
{
    public class ReporteDA : IReporteDA
    {
        private IRepositorioDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public ReporteDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<ActivosResponse> ObtenerActivos()
        {
            string query = @"SELECT TotalActivos FROM vw_EmprendimientosActivos";
            var resultado = await _sqlConnection.QueryFirstOrDefaultAsync<ActivosResponse>(query);
            return resultado;
        }

        public async Task<IEnumerable<CrecimientoResponse>> ObtenerCrecimiento()
        {
            string query = @"SELECT Anio, Mes, TotalVentas
                            FROM vw_CrecimientoMensual";
            var resultado = await _sqlConnection.QueryAsync<CrecimientoResponse>(query);
            return resultado;
        }

        

        public async Task<IEnumerable<TopSectorResponse>> ObtenerTopSectores()
        {
            string query = @"SELECT Sector, TotalVentas
                            FROM vw_TopSectores";
            var resultado = await _sqlConnection.QueryAsync<TopSectorResponse>(query);
            return resultado;
        }

        public async Task<IEnumerable<VentasPorSectorResponse>> ObtenerVentasPorSector()
        {
            string query = @"SELECT Sector, CantidadEmprendimientos, TotalVentas
                            FROM vw_VentasPorSector";
            var resultado = await _sqlConnection.QueryAsync<VentasPorSectorResponse>(query);
            return resultado;

        }


        //Emprendimientos

        public async Task<IEnumerable<VentasMensuales>> ObtenerVentasMensuales(int emprendimientoId)
        {
            string query = @"SELECT * FROM FN_REPORTE_VENTAS_MENSUALES(@Id)";
            return await _sqlConnection.QueryAsync<VentasMensuales>(query, new { Id = emprendimientoId });
        }

        public async Task<IEnumerable<InventarioReporte>> ObtenerInventario(int emprendimientoId)
        {
            string query = @"SELECT * FROM FN_REPORTE_INVENTARIO(@Id)";
            return await _sqlConnection.QueryAsync<InventarioReporte>(query, new { Id = emprendimientoId });
        }

        public async  Task<KpiNegocio> ObtenerKpi(int emprendimientoId)
        {
            string query = @"SELECT * FROM FN_KPI_NEGOCIO(@Id)";
            return await _sqlConnection.QueryFirstOrDefaultAsync<KpiNegocio>(query, new { Id = emprendimientoId });
        }

        public async Task<IEnumerable<ProductoBajo>> ObtenerProductosBajo(int emprendimientoId)
        {
            string query = @"SELECT * FROM FN_PRODUCTOS_BAJO_RENDIMIENTO(@Id)";
            return await _sqlConnection.QueryAsync<ProductoBajo>(query, new { Id = emprendimientoId });
        }

        public async Task<IEnumerable<ProductoTop>> ObtenerProductosTop(int emprendimientoId)
        {
            string query = @"SELECT * FROM FN_REPORTE_TOP_PRODUCTOS(@Id)";
            return await  _sqlConnection.QueryAsync<ProductoTop>(query, new { Id = emprendimientoId });

        }

        public async Task<IEnumerable<TicketPromedioDto>> ObtenerTicketPromedio(int emprendimientoId)
        {
            string query = @"SELECT * FROM FN_TICKET_PROMEDIO_MENSUAL(@Id)";
            return await _sqlConnection.QueryAsync<TicketPromedioDto>(query, new { Id = emprendimientoId });
        }

    }
}
