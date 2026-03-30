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
    public class StandDA : IStandDA
    {
        private IRepositorioDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public StandDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<int> ActualizarStand(int id, StandRequest stand)
        {

            string query = @"SP_ActualizarStand";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Stand_id = id,
                Codigo = stand.Codigo,
                X = stand.X,
                Y = stand.Y,
                Ancho = stand.Ancho,
                Alto = stand.Alto,
                Rotacion = stand.Rotacion,
                Mapa_id = stand.Mapa_id,
            });
            return resultQuery;
        }

        public async Task<int> AgregarStand(StandRequest stand)
        {
            string query = @"SP_AgregarStand";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Codigo = stand.Codigo,
                X = stand.X,
                Y = stand.Y,
                Ancho = stand.Ancho,
                Alto = stand.Alto,
                Rotacion = stand.Rotacion,
                Mapa_id = stand.Mapa_id,
                Estado_id = 1
            });
            return resultQuery;
        }

        public async Task<int> CambiarEstadoStand(int stand_id, int estado_id)
        {

            string query = @"SP_CambiarEstadoStand";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Stand_id = stand_id,
                Estado_id = estado_id
            });
            return resultQuery;
        }

        public async Task<StandResponse> ObtenerStandPorId(int stand_id)
        {
            try
            {
                string query = @"SP_ObtenerStandsPorId";
                var parameters = new
                {
                    Stand_id = stand_id
                };
                return await _sqlConnection.QueryFirstOrDefaultAsync<StandResponse>(query, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<StandResponse>> ObtenerStandPorMapa(int mapa_id)
        {
            try
            {
                string query = @"SP_ObtenerStandsPorMapa";
                var parameters = new
                {
                    Mapa_id = mapa_id
                };
                return await _sqlConnection.QueryAsync<StandResponse>(query, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
