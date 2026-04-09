using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Abstracciones.Modelos.Eventos;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
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

        public async Task<int> AprobarReserva(int Reserva_id)
        {
            string query = "sp_AprobarReserva_Evento";
            var resultado = await _sqlConnection.ExecuteScalarAsync<int>(
                query, new
                {
                    Reserva_id = Reserva_id   
                });
            return resultado;
        }

        public async Task<int> CrearReservaEvento(ReservaEventoRequest reserva)
        {
            string query = "sp_CrearReservaEvento";
            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<int>(
                query, new
                {
                    Evento_id = reserva.Evento_id,
                    Emprendimiento_id = reserva.Emprendimiento_id,
                    Nombre = reserva.Nombre,
                    Apellidos = reserva.Apellidos,
                    Cedula = reserva.Cedula,
                    NombreEmprendimiento = reserva.NombreEmprendimiento,
                    Productos = reserva.Productos,
                    Correo = reserva.Correo
                }, commandType: CommandType.StoredProcedure);
            return resultadoConsulta;
        }

        public async Task<ReservaEventoRequest> ObtenerReservaPorId(int reserva_id)
        {
            string query = "sp_ObtenerReservaPorId";
            return await _sqlConnection.QueryFirstOrDefaultAsync<ReservaEventoRequest>(query,
                new { 
                    Reserva_id = reserva_id 
                },commandType: CommandType.StoredProcedure);
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

        public Task<int> RechazarReserva(int Reserva_id)
        {
            string query = "sp_RechazarReserva_Evento";
            var resultado = _sqlConnection.ExecuteScalarAsync<int>(
                query, new
                {
                    Reserva_id = Reserva_id
                });
            return resultado;
        }

        public async Task<bool> TieneReservaAceptada(int emprendimiento_id, int evento_id)
        {
            string query = "sp_Tiene_Reserva_Aceptada";

            var count = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Emprendimiento_id = emprendimiento_id,
                Evento_id = evento_id
            }, commandType: CommandType.StoredProcedure);
            return count > 0;

        }
    }
}
