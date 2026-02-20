using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Abstracciones.Interfaces.DA;
using Microsoft.IdentityModel.Protocols;
using System.Data;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace DA.Repositorios
{
    public class RepositorioDapper : IRepositorioDapper, IDisposable 
    {
        private readonly IConfiguration _configuracion;
        private readonly SqlConnection _conexionBaseDatos;

        public RepositorioDapper(IConfiguration configuracion)
        {
            _configuracion = configuracion;
            _conexionBaseDatos = new SqlConnection(_configuracion.GetConnectionString("BD"));
        }

        public SqlConnection ObtenerRepositorio()
        {
            return _conexionBaseDatos;

        }

        public async Task<int> EjecutarSp(string nombreSp, object? parametros = null)
        {
            if (_conexionBaseDatos.State != ConnectionState.Open)
                await _conexionBaseDatos.OpenAsync();

            return await _conexionBaseDatos.ExecuteAsync(
                nombreSp,
                parametros,
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<T>> ObtenerInfo<T>(string nombreSp, object? parametros = null)
        {
            if (_conexionBaseDatos.State != ConnectionState.Open)
                await _conexionBaseDatos.OpenAsync();

            var resultado = await _conexionBaseDatos.QueryAsync<T>(
                nombreSp,
                parametros,
                commandType: CommandType.StoredProcedure
            );

            return resultado;
        }

        public void Dispose()
        {
            if (_conexionBaseDatos != null)
            {
                if (_conexionBaseDatos.State != ConnectionState.Closed)
                    _conexionBaseDatos.Close();

                _conexionBaseDatos.Dispose();
            }
        }
    }
}
