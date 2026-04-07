using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.DA.Eventos.logica;
using Abstracciones.Modelos.Eventos.Logica;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using System.Data;

namespace DA.Eventos.Logica
{
    public class EventoZonaStandDA : IEventoZonaStandDA
    {
        private IRepositorioDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public EventoZonaStandDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<int> AgregarStandAEvento(EventoZonaStandBase stand)
        {
            string query = @"SP_AgregarEventoZonaStand";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Evento_id = stand.Evento_id,
                Zona_id = stand.Zona_id,
                Stand_id = stand.Stand_id,
                Emprendimientos_id = stand.Emprendimiento_id,
                Estado_id = 11
            });
            return resultQuery;
        }

        public async Task<int> CambiarDisponibilidadStand(int estado_id, EventoZonaStandBase stand)
        {
            string query = @"SP_CambiarDisponibilidadStandEvento";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Stand_id = stand.Stand_id,
                Evento_id = stand.Evento_id,
                Zona_id = stand.Zona_id,
                Emprendimientos_id = stand.Emprendimiento_id,
                Estado_id = estado_id
            });
            return resultQuery;
        }

        public async Task<IEnumerable<EventoZonaStandResponse>> ObtenerStandsEvento(int zona_id, int evento_id)
        {
            try
            {
                string query = @"SP_ObtenerStandsPorEventoYZona";
                var parameters = new
                {
                    Evento_id = evento_id,
                    Zona_id = zona_id
                };
                return await _sqlConnection.QueryAsync<EventoZonaStandResponse>(query, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
