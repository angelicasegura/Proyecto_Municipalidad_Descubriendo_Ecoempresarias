using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Abstracciones.Modelos.Eventos;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DA
{
    public class ReservaEventoDA : IReservaEventoDA
    {
        private IRepositorioDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public ReservaEventoDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<int> AprobarReserva(int eventoId, int emprendimientoId)
        {
            string query = "sp_AprobarReserva_Evento";
            var resultado = await _sqlConnection.ExecuteScalarAsync<int>(
                query, new
                {
                    Evento_id = eventoId,
                    Emprendimiento_id = emprendimientoId
                });
            return resultado;
        }

        public async Task<int> CrearReservaEvento(ReservaEventoRequest reserva)
        {
            string query = "sp_CrearReserva_Evento";
            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<int>(
                query, new
                {
                    Evento_id = reserva.Evento_id,
                    Emprendimiento_id = reserva.Emprendimiento_id
                });
            return resultadoConsulta;
        }

        public async Task<List<ReservaEventoResponse>> ObtenerReservasEmprendimiento(int emprendimientoId)
        {
            string query = "sp_ObtenerReservas_Emprendimiento";
            var resultadoConsulta = await _sqlConnection.QueryAsync<ReservaEventoResponse>(
                query, new { Emprendimiento_id = emprendimientoId });
            return resultadoConsulta.ToList();
        }

        public async Task<List<solicitudReservaEvento>> ObtenerSolicitudesReservaEvento()
        {
            string query = "sp_ObtenerSolicitudes_Evento";
            var resultado = await _sqlConnection.QueryAsync<solicitudReservaEvento>(
                query);
            return resultado.ToList();
        }

        public Task<int> RechazarReserva(int eventoId, int emprendimientoId)
        {
            string query = "sp_RechazarReserva_Evento";
            var resultado = _sqlConnection.ExecuteScalarAsync<int>(
                query, new
                {
                    Evento_id = eventoId,
                    Emprendimiento_id = emprendimientoId
                });
            return resultado;
        }
    }
}
