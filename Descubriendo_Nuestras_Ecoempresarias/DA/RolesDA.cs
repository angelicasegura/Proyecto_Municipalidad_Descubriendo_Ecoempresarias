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
    public class RolesDA : IRolesDA
    {
        private IRepositorioDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public RolesDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<Roles?> ObtenerRolPorId(int rolId)
        {
            string query = @"ObtenerRolPorId";

            var resultQuery = await _sqlConnection.QueryAsync<Roles>(query, new { rolId });

            return resultQuery.FirstOrDefault();

        }
    }
}
