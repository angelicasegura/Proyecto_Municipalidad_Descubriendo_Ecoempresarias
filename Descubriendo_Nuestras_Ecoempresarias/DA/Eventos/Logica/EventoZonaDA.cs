using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.DA.Eventos.logica;
using Abstracciones.Modelos.Eventos.Logica;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DA.Eventos.Logica
{
    public class EventoZonaDA : IZonaEventoDA
    {
        private IRepositorioDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public EventoZonaDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<int> AgregarZonaAEvento(EventoZonaBase zona)
        {
            string query = @"SP_AgregarEventoZona";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Evento_id = zona.Evento_id,
                Zona_id = zona.Zona_id,
                Estado_id = 1
            });
            return resultQuery;
        }

        public async Task<int> CambiarDisponibilidadZona(int estado_id, EventoZonaBase zona)
        {
            string query = @"SP_CambiarDisponibilidadZona";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {

                Evento_id = zona.Evento_id,
                Zona_id = zona.Zona_id,
                Estado_id = estado_id
            });
            return resultQuery;
        }

        public async Task<IEnumerable<EventoZonaResponse>> ObtenerZonaAEventoYEstado(int estadoid, int evento_id)
        {

            try
            {
                string query = @"SP_ObtenerZonasPorEventoYEstado";
                var parameters = new
                {
                    Evento_id = evento_id,
                    Estado_id = estadoid
                };
                return await _sqlConnection.QueryAsync<EventoZonaResponse>(query, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<EventoZonaResponse>> ObtenerZonaEvento(int evento_id)
        {
            try
            {
                string query = @"SP_ObtenerZonasPorEvento";
                var parameters = new
                {
                    Evento_id = evento_id
                };
                return await _sqlConnection.QueryAsync<EventoZonaResponse>(query, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
