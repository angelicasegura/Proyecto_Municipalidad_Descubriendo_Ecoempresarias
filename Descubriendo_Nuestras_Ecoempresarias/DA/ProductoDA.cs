using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;




namespace DA
{
    public class ProductoDA : IProductoDA
    {
        private IRepositorioDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public ProductoDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<Guid> AgregarProducto(ProductoRequest producto)
        {
            string query = @"SP_AgregarProducto";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<Guid>(query, new
            {
                Producto_id = Guid.NewGuid(),
                NombreProducto = producto.NombreProducto,
                Descripcion = producto.Descripcion,
                Descuento = producto.Descuento,
                Ruta_Imagen = producto.Ruta_Imagen,
                Precio = producto.Precio,
                Categoria_id = producto.Categoria_id,
                Emprendimiento_id = producto.Emprendimiento_id,
                Estado_id = 3
            });
            return resultQuery;
        }

        public async Task<Guid> EditarProducto(Guid id, ProductoRequest producto)
        {
            int estado;

            bool verificacion = await VerificarDatosModificados(id, producto);

            if (verificacion == true && producto.Estado_id == 1)
                estado = 1;
            else
                estado = 4;

            string query = @"SP_EditarInformacionGeneralProducto";
                var resultQuery = await _sqlConnection.ExecuteScalarAsync<Guid>(query, new
                {
                    Producto_id = id,
                    NombreProducto = producto.NombreProducto,
                    Descripcion = producto.Descripcion,
                    Descuento = producto.Descuento,
                    Ruta_Imagen = producto.Ruta_Imagen,
                    Precio = producto.Precio,
                    Categoria_id = producto.Categoria_id,
                    Estado_id = estado
                });
                return resultQuery;
        }
        public async Task<Guid> ElimnarProducto(Guid id)
        {
            string query = @"SP_InactivarProducto";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<Guid>(query, new
            {
                Producto_id = id
            });
            return resultQuery;
        }

        public async Task<ProductoRequest> ObtenerProducto(Guid Producto_id)
        {
            string query = @"SP_ObtenerProductoPorId";
            var resultQuery = await _sqlConnection.QueryAsync<ProductoRequest>(query, new { Producto_id });
            return resultQuery.FirstOrDefault();
        }

        public async Task<IEnumerable<ProductoResponse>> ObtenerProductos(Guid? categoria_id, String? nombre, int? emprendimiento_id, int? estado_id)
        {
            var parameters = new
            {
                Categoria_id = categoria_id,
                Nombre = nombre,
                Emprendimiento_id = emprendimiento_id,
                Estado_id = estado_id
            };
            string query = @"SP_ObtenerProductos";
            var resultQuery = await _sqlConnection.QueryAsync<ProductoResponse>(
                query,
                parameters,
                commandType: CommandType.StoredProcedure
    );
            return resultQuery;
        }

        private async Task<bool> VerificarDatosModificados(Guid id, ProductoRequest producto) {

            try
            {
                var resultado = await ObtenerProducto(id);
                if (producto.NombreProducto == resultado.NombreProducto && producto.Descripcion == resultado.Descripcion && producto.Ruta_Imagen == resultado.Ruta_Imagen)
                    return true;
                else
                    return false;
            }
            catch (Exception ex) {

                throw new Exception($"Error verificando al recuperar el producto para modificar: {ex.Message}", ex);

            }

        }


    }
}
