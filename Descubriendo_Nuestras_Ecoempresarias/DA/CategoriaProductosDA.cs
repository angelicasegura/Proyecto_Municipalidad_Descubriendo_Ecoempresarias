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
    public class CategoriaProductosDA : ICategoriaProductosDA
    {
        private SqlConnection _sqlConnection;
        private IRepositorioDapper _repositorioDapper;

        public CategoriaProductosDA( IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();

        }

        public async Task<List<CategoriaProducto>> ObtenerCategoriasProductos()
        {
            try
            {
                string query = @"sp_ObtenerCategoriasActivas";

                var lista = await _sqlConnection.QueryAsync<CategoriaProducto>(
                    query,
                    commandType: System.Data.CommandType.StoredProcedure
                ).ConfigureAwait(false);

                return lista.ToList();
            }
            catch(Exception ex) {
            
                throw new Exception($"Error al obtener las categorias de productos: {ex.Message}");
            }
        }
    }
}
