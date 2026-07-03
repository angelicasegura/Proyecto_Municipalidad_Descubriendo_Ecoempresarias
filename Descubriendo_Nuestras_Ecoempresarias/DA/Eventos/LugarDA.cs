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
using static Abstracciones.Modelos.Emprendimiento;

namespace DA.Eventos
{
    public class LugarDA : ILugarDA
    {

        private IRepositorioDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public LugarDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<int> AgregarLugar(LugarRequest lugar)
        {
            string query = @"SP_AgregarLugar";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Nombre = lugar.Nombre,
                Provincia = lugar.Provincia,
                Canton = lugar.Canton,
                Distrito = lugar.Distrito,
                Detalles = lugar.Detalles,
                Estado_id = 1
            });
            return resultQuery;
        }

        public async Task<int> EditarLugar(int id, LugarRequest lugar)
        {
            string query = @"SP_EditarLugar";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Lugar_id = id,
                Nombre = lugar.Nombre,
                Provincia = lugar.Provincia,
                Canton = lugar.Canton,
                Distrito = lugar.Distrito,
                Detalles = lugar.Detalles,
                Estado_id = lugar.Estado_id
            });
            return resultQuery;
        }

        public async Task<int> ActualizarEstadoLugar(int id, int estado)
        {
            try
            {
                string query = "SP_ActualizarEstadoLugar";

                var resultado = await _sqlConnection.ExecuteScalarAsync<int>(
                    query,
                    new
                    {
                        Lugar_id = id,
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
                throw new Exception("Error actualizando el estado del lugar.");
            }
        }

        public async Task<IEnumerable<LugarResponse>> ObtenerLugares()
        {

            string query = @"SP_ObtenerLugares";
            var resultQuery = await _sqlConnection.QueryAsync<LugarResponse>(query);
            return resultQuery;
        }

        public async Task<LugarResponse> ObtenerLugarPorId(int id)
        {
            try
            {
                string query = @"SP_ObtenerLugarPorId";
                var parameters = new
                {
                    Lugar_id = id
                };
                return await _sqlConnection.QueryFirstOrDefaultAsync<LugarResponse>(query, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
