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
    public class UsuarioDA : IUsuarioDA
    {

        private IRepositorioDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public UsuarioDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }


        public async Task<int> Agregar(UsuarioRequest usuario)
        {
            throw new NotImplementedException();
        }

        public async Task<int> Editar(int Id, UsuarioRequest usuario)
        {
            throw new NotImplementedException();
        }

        public async Task<int> Eliminar(int Id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<UsuarioResponse>> Obtener()
        {
            throw new NotImplementedException();
        }

        public async Task<UsuarioResponse> ObtenerUsuario(int Id)
        {
            string query = @"ObtenerUsuarioPorId";
            var resultQuery = await _sqlConnection.QueryAsync<UsuarioResponse>(query, new { Id });

            return resultQuery.FirstOrDefault();
        }

        public async Task<UsuarioResponse> InicioSesionUsuario(string email, string contrasena)
        {
            string query = @"ObtenerUsuario";
            var resultQuery = await _sqlConnection.QueryAsync<UsuarioResponse>(query, new { email, contrasena});

            return resultQuery.FirstOrDefault();
        }

        private async Task verificarUsuarioExiste(int Id)
        {
            UsuarioResponse? resultadoConsultaUsuario = await ObtenerUsuario(Id);
            if (resultadoConsultaUsuario == null)
                throw new Exception("No se encontro el usuario");

        }
    }
}
