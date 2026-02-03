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
            //await verificarUsuarioExiste(Id);
            string query = @"EditarUsuario";

            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Usuario_id = usuario.IdUsuario,
                Nombre = usuario.Nombre,
                Apellidos = usuario.Apellidos,
                Telefono = usuario.Telefono,
                Contrasena = usuario.Contrasena,
                Email = usuario.Email,
                Ruta_Imagen_Perfil = usuario.Ruta_Imagen_Perfil,
                Edad = usuario.Edad
            }); //ExecuteScalarAsync INDICAMOS QUE ESPERAMOS UN VALOR DE RETORNO DEL QUERY

            return resultQuery;
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

        public async Task<UsuarioRequest> BuscarUsuarioPorEmail(string email)
        {
            string query = @"ObtenerUsuarioPorEmail";
            var resultQuery = await _sqlConnection.QueryAsync<UsuarioRequest>(query, new { email });

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

