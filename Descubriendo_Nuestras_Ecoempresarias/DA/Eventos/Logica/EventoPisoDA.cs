using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.DA.Eventos.logica;
using Abstracciones.Modelos.Eventos;
using Abstracciones.Modelos.Eventos.Logica;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;


namespace DA.Eventos.Logica
{
    public class EventoPisoDA : IPisoEventoDA
    {
        private IRepositorioDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public EventoPisoDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }


        public async  Task<int> AgregarPisoAEvento(EventoPisoBase piso)
        {

            string query = @"SP_AgregarEventoPiso";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Evento_id = piso.Evento_id,
                Piso_id = piso.Piso_id,
                Estado_id = 1
            });
            return resultQuery;
        }

        public async Task<int> CambiarDisponibilidadPiso(int estado_id, EventoPisoBase piso)
        {
            string query = @"SP_CambiarDisponibilidadPiso";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Evento_id = piso.Evento_id,
                Piso_id = piso.Piso_id,
                Estado_id = estado_id
            });
            return resultQuery;
        }

        public async Task<IEnumerable<EventoPisoResponse>> ObtenerPisoEvento(int evento_id)
        {
            try
            {
                string query = @"SP_ObtenerPisosPorEvento";
                var parameters = new
                {
                    Evento_id = evento_id
                };
                return await _sqlConnection.QueryAsync<EventoPisoResponse>(query, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<EventoPisoResponse>> ObtenerPisoEventoYEstado(int estadoid, int evento_id)
        {
            try
            {
                string query = @"SP_ObtenerPisosPorEventoYEstado";
                var parameters = new
                {
                    Evento_id = evento_id,
                    Estado_id = estadoid
                };
                return await _sqlConnection.QueryAsync<EventoPisoResponse>(query, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
