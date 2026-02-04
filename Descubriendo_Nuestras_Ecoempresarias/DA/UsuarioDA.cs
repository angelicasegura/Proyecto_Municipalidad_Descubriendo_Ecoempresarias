using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Abstracciones.Modelos.Pagination;
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
            string query = @"AgregarUsuario";
            var resultQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                Usuario_id = usuario.IdUsuario,
                Nombre = usuario.Nombre,
                Apellidos = usuario.Apellidos,
                Telefono = usuario.Telefono,
                Contrasena = usuario.Contrasena,
                Email = usuario.Email,
                Ruta_Imagen_Perfil = usuario.Ruta_Imagen_Perfil,
                Edad = usuario.Edad,
                Estado_id = usuario.IdEstado,
                Rol_id = usuario.IdRol


            });

            return resultQuery;
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
            var resultQuery = await _sqlConnection.QueryAsync<UsuarioResponse>(query, new { Usuario_id = Id });

            return resultQuery.FirstOrDefault();
        }

        public async Task<UsuarioResponse> InicioSesionUsuario(string email, string contrasena)
        {
            string query = @"ObtenerUsuario";
            var resultQuery = await _sqlConnection.QueryAsync<UsuarioResponse>(query, new { email, contrasena });

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


        public async Task<PagedResult<UsuarioResponse>> GetUsuariosPaginadosAsync(int page, int limit, string search, int? roleId)
        {

            var connection = _repositorioDapper.ObtenerRepositorio();

            try
            {
                if (connection.State == ConnectionState.Closed)
                    await connection.OpenAsync();

                var parameters = new
                {
                    Page = page,
                    Limit = limit,
                    Search = search,
                    Role = roleId
                };

                using (var multi = await connection.QueryMultipleAsync("sp_GetUsuariosPaginados", parameters, commandType: CommandType.StoredProcedure))
                {
                    var items = await multi.ReadAsync<UsuarioResponse>();
                    var total = await multi.ReadFirstAsync<int>();
                    return new PagedResult<UsuarioResponse> { Items = items, TotalCount = total };
                }
            }
            catch (Exception ex)
            {

                throw new Exception("Error al consultar la base de datos en GetUsuariosPaginadosAsync", ex);
            }
        }

        public async Task<int> EditarAdmin(int Id, UsuarioResponse usuario)
        {
            try
            {
                string query = @"sp_EditarUsuarioPorAdmin";
                var resultadoQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
                {
                    IdUsuario = usuario.IdUsuario,
                    Nombre = usuario.Nombre,
                    Apellidos = usuario.Apellidos,
                    Telefono = usuario.Telefono,
                    Email = usuario.Email,
                    Edad = usuario.Edad,
                    IdEstado = usuario.IdEstado,
                    IdRol = usuario.IdRol,
                });

                if (resultadoQuery != null)
                {
                    return 1;
                }
                return 0;

            }
            catch (Exception ex)
            {
                throw new Exception("Algo salio mal con la actualizacion");
            }

        }

        public async Task<int> ActualizarEstadoDeUsuario(int Id, int estado)
        {
            try
            {

                string query = @"sp_ActualizarEstadoUsuario";
                var resultadoQuery = await _sqlConnection.ExecuteScalarAsync<int>(query, new
                {
                    Usuario_id = Id,
                    Estado_id = estado
                });

                if (resultadoQuery != null)
                {
                    return 1;
                }
                return 0;

            }
            catch (Exception ex)
            {
                throw new Exception("Algo salio mal con la actualizacion");
            }
        }
    }
}

