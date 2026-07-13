using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.DA.Eventos;
using Abstracciones.Modelos.Eventos;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;


namespace DA.Eventos
{
    public class EventoDA : IEventoDA
    {

        private IRepositorioDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public EventoDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<int> AgregarEvento(EventoRequest evento)
        {
            string query = @"SP_AgregarEvento";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Lugar_Id = evento.Lugar_id,
                NombreEvento = evento.NombreEvento,
                Descripcion = evento.Descripcion,
                Fecha_inicio = evento.Fecha_inicio,
                Fecha_Final = evento.Fecha_Final,
                Horario = evento.Horario,
                Cupos = evento.Cupos, 
                Estado_id = 1
            });
            return resultQuery;
        }

        public async Task<int> EditarEvento(int id, EventoRequest evento)
        {

            string query = @"SP_EditarEvento";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Lugar_id = evento.Lugar_id,
                Evento_id = id,
                NombreEvento = evento.NombreEvento,
                Descripcion = evento.Descripcion,
                Fecha_inicio = evento.Fecha_inicio,
                Fecha_Final = evento.Fecha_Final,
                Horario = evento.Horario,
                Cupos = evento.Cupos,
                Estado_id = evento.Estado_id
            });
            return resultQuery;
        }

        public async Task<int> ActualizarEstadoEvento(int id, int estado)
        {
            try
            {
                string query = "SP_ActualizarEstadoEvento";

                var resultado = await _sqlConnection.ExecuteScalarAsync<int>(
                    query,
                    new
                    {
                        Evento_id = id,
                        Estado_id = estado
                    },
                    commandType: CommandType.StoredProcedure
                );

                if (resultado != 0)
                    return 1;

                return 0;
            }
            catch
            {
                throw new Exception("Error actualizando el estado del evento.");
            }
        }

        public async Task<EventoResponse> ObtenerEventoPorId(int id)
        {
            try
            {
                string query = @"SP_ObtenerEventoPorId";
                var parameters = new
                {
                    Evento_id = id
                };
                return await _sqlConnection.QueryFirstOrDefaultAsync<EventoResponse>(query, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<EventoResponse> ObtenerEventoPorNombre(string nombre)
        {

            try
            {
                string query = @"SP_ObtenerEventoPorNombre";
                var parameters = new
                {
                    Nombre = nombre
                };
                return await _sqlConnection.QueryFirstOrDefaultAsync<EventoResponse>(query, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<EventoResponse>> ObtenerEventos()
        {

            string query = @"SP_ObtenerEventos";
            var resultQuery = await _sqlConnection.QueryAsync<EventoResponse>(query, commandType: CommandType.StoredProcedure);
            return resultQuery;
        }
    }
}
