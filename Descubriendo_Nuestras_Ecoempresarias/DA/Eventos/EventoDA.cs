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
                Cupos_actuales = evento.Cupos,
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
                Cupos_actuales = evento.Cupos_actuales,
                Estado_id = evento.Estado_id
            });
            return resultQuery;
        }

        public async Task<int> InactivarEvento(int id)
        {
            string query = @"SP_InactivarEvento";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Evento_id = id
            });
            return resultQuery;
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
