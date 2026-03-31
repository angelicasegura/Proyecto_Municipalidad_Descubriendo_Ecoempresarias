using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.DA.Eventos;
using Abstracciones.Modelos.Eventos;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DA.Eventos
{
    public class ZonaDA : IZonaDA
    {

        private IRepositorioDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public ZonaDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }


        public async Task<int> AgregarZona(ZonaRequest zona)
        {

            string query = @"SP_AgregarZona";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Nombre = zona.Nombre,
                Descripcion = zona.Descripcion,
                Piso_id = zona.Piso_id,
                Mapa_id = zona.Mapa_id,
                Estado_id = 1
            });
            return resultQuery;
        }

        public async Task<int> CambiarEstadoZona(int zona_id, int estado_id)
        {

            string query = @"SP_CambiarEstadoZona";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Zona_id = zona_id,
                Estado_id = estado_id
            });
            return resultQuery;
        }

        public async Task<int> EditarZona(int id, ZonaRequest zona)
        {
            string query = @"SP_EditarZona";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Zona_id = id,
                Nombre = zona.Nombre,
                Descripcion = zona.Descripcion,
                Piso_id = zona.Piso_id,
                Mapa_id = zona.Mapa_id,

            });
            return resultQuery;
        }

        public async Task<ZonaResponse> ObtenerZonaPorId(int zona_id)
        {
            try
            {
                string query = @"SP_ObtenerZonasPorId";
                var parameters = new
                {
                    Zona_id = zona_id
                };
                return await _sqlConnection.QueryFirstOrDefaultAsync<ZonaResponse>(query, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<ZonaResponse>> ObtenerZonasPorPiso(int piso_id)
        {
            try
            {
                string query = @"SP_ObtenerZonasPorPiso";
                var parameters = new
                {
                    Piso_id = piso_id
                };
                return await _sqlConnection.QueryAsync<ZonaResponse>(query, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
