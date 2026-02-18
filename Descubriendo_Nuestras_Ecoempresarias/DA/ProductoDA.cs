using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Microsoft.Data.SqlClient;
using Dapper;




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
                Ruta_Imagen = producto.Ruta_Imagen,
                Precio = producto.Precio,
                Categoria_id = producto.Categoria_id,
                Estado_id = 3
            });
            return resultQuery;
        }

        public async Task<Guid> EditarProducto(Guid id, ProductoRequest producto)
        {
            string query = @"SP_EditarInformacionGeneralProducto";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<Guid>(query, new
            {
                Producto_id = id,
                NombreProducto = producto.NombreProducto,
                Descripcion = producto.Descripcion,
                RutaImagen = producto.Ruta_Imagen,
                Precio = producto.Precio,
                Categoria_id = producto.Categoria_id,
                Estado = 4
            });
            return resultQuery;

        }

        public async Task<Guid> ElimnarProducto(Guid id)
        {
            string query = @"SP_InactivarProducto";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<Guid>(query, new
            {
                Producto_id = id,
                Estado = 2
            });
            return resultQuery;
        }

        public async Task<ProductoRequest> ObtenerProducto(Guid Producto_id)
        {
            string query = @"SP_ObtenerProductoPorId";
            var resultQuery = await _sqlConnection.QueryAsync<ProductoRequest>(query, new { Producto_id });
            return resultQuery.FirstOrDefault();
        }

        public async Task<IEnumerable<ProductoResponse>> ObtenerProductos()
        {
            string query = @"SP_ObtenerProductos";
            var resultQuery = await _sqlConnection.QueryAsync<ProductoResponse>(query);
            return resultQuery;
        }
    }
}
