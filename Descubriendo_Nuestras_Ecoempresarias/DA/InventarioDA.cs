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
    public class InventarioDA : IInventarioDA
    {
        private IRepositorioDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public InventarioDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }



        public async Task<Guid> AgregarInventario(Inventario inventario)
        {
            try
            {
                string query = @"sp_agregarInventario";
                var resultQuery = await _sqlConnection.ExecuteScalarAsync<Guid>(query, new
                {
                    Inventario_id = Guid.NewGuid(),
                    Producto_id = inventario.ProductoId,
                    Cantidad_actual = inventario.CantidadActual,
                    Cantidad_minima = inventario.CantidadMinima,
                    Estado_id = 1
                });
                return resultQuery;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el inventario");
            }
        }

        public async Task<Guid> EditarInventario(Guid id, Inventario inventario)
        {
            try
            {
                string query = @"sp_editarInventario";
                var resultQuery = await _sqlConnection.ExecuteScalarAsync<Guid>(query, new
                {
                    Inventario_id = id,
                    Producto_id = inventario.ProductoId,
                    @Cantidad_actual = inventario.CantidadActual,
                    Cantidad_minima = inventario.CantidadMinima,
                    Estado_id = inventario.EstadoId
                });
                return resultQuery;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al editar el inventario");
            }
        }


        public async Task<List<Inventario>> ObtenerInventarios(int emprendimiento_id)
        {
            try
            {
                string query = @"sp_ObtenerInventarioPorEmprendimiento";
                var parameters = new
                {
                    Emprendimiento_id = emprendimiento_id
                };
                var resultQuery = await _sqlConnection.QueryAsync<Inventario>(query, parameters, commandType: System.Data.CommandType.StoredProcedure);
                return resultQuery.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener los inventarios");
            }

        }
    }
}
