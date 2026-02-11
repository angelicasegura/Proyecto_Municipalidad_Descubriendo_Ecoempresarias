using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DA
{
    public class TiposActividadDA : ITiposActividadDA
    {
        private IRepositorioDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public TiposActividadDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }
        public async Task<IEnumerable<TiposActividad.TipoActividadResponse>> ObtenerTiposActividad()
        {
            string query = @"sp_ObtenerTiposActividad";
            var resultQuery = await _sqlConnection.QueryAsync<TiposActividad.TipoActividadResponse>(query);
            return resultQuery;

        }
    }
}
