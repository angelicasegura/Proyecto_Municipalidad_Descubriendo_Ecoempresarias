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
    public class PisoDA : IPisoDA
    {

        private IRepositorioDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public PisoDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }
        public async Task<int> AgregarPiso(PisoRequest piso)
        {

            string query = @"SP_AgregarPiso";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Nombre_piso = piso.Nombre_Piso,
                Numero_piso = piso.Numero_Piso,
                Lugar_id = piso.Lugar_id,
                Estado_id = 1
            });
            return resultQuery;
        }

        public async Task<int> EditarPiso(int id, PisoRequest piso)
        {
            string query = @"SP_EditarPiso";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Piso_id = id,
                Nombre_piso = piso.Nombre_Piso,
                Numero_piso = piso.Numero_Piso,
                Lugar_id = piso.Lugar_id,
                Estado_id = piso.Estado_id
            });
            return resultQuery;
        }

        public async Task<int> InactivarPiso(int id)
        {
            string query = @"SP_InactivarPiso";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Piso_id = id
            });
            return resultQuery;
        }

        public async Task<PisoResponse> ObtenerPisoPorId(int id)
        {
            try
            {
                string query = @"SP_ObtenerPisosPorId";
                var parameters = new
                {
                    Piso_id = id
                };
                return await _sqlConnection.QueryFirstOrDefaultAsync<PisoResponse>(query, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }


        }

        public async Task<IEnumerable<PisoResponse>> ObtenerPisosPorLugar(int lugar_id)
        {
            try
            {
                string query = @"SP_ObtenerPisosPorLugar";
                var parameters = new
                {
                    Lugar_id = lugar_id
                };
                return await _sqlConnection.QueryAsync<PisoResponse>(query, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
