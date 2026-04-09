using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.DA.Eventos;
using Abstracciones.Modelos.Eventos;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DA.Eventos
{
    public class MapaDA : IMapaDA
    {
        private IRepositorioDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public MapaDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<int> AgregarMapa(MapaRequest mapa)
        {

            string query = @"SP_AgregarMapa";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Nombre = mapa.Nombre,
                Alto = mapa.Alto,
                Ancho = mapa.Ancho,
                Escala = mapa.Escala,
                Estado_id = 1
            });
            return resultQuery;
        }

        public async Task<int> CambiarEstadoMapa(int mapa_id, int estado_id)
        {
            string query = @"SP_CambiarEstadoMapa";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Mapa_id = mapa_id,
                Estado_id = estado_id
            });
            return resultQuery;
        }

        public async Task<int> EditarMapa(int id, MapaRequest mapa)
        {
            string query = @"SP_EditarMapa";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Mapa_id = id,
                Nombre = mapa.Nombre,
                Alto = mapa.Alto,
                Ancho = mapa.Ancho,
                Escala = mapa.Escala

            });
            return resultQuery;
        }

        public async Task<MapaResponse> ObtenerMapaPorId(int mapa_id)
        {
            try
            {
                string query = @"SP_ObtenerMapasPorId";
                var parameters = new
                {
                    Mapa_id = mapa_id
                };
                return await _sqlConnection.QueryFirstOrDefaultAsync<MapaResponse>(query, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<MapaResponse>> ObtenerMapas()
        {
            string query = @"SP_ObtenerMapas";
            var resultQuery = await _sqlConnection.QueryAsync<MapaResponse>(query);
            return resultQuery;
        }
    }
}
