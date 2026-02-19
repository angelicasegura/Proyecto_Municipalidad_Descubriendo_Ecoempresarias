using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Abstracciones.Modelos.Pagination;
using Microsoft.Data.SqlClient;
using System.Data;


namespace Flujo
{
    public class UsuarioFlujo : IUsuarioFlujo
    {
        private IUsuarioDA _usuarioDA;

        public UsuarioFlujo(IUsuarioDA usuarioDA)
        {
            _usuarioDA = usuarioDA;

        }


        public async Task<int> Agregar(UsuarioRequest usuario)
        {
            return await _usuarioDA.Agregar(usuario);
        }

        public Task<int> Editar(int Id, UsuarioRequest usuario)
        {
            return _usuarioDA.Editar(Id, usuario);
        }

        public Task<int> Eliminar(int Id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<UsuarioResponse>> Obtener()
        {
            throw new NotImplementedException();
        }

        public Task<UsuarioResponse> ObtenerUsuario(int Id)
        {
            return _usuarioDA.ObtenerUsuario(Id);

        }
        public Task<UsuarioResponse> InicioSesionUsuario(string email, string contrasena)
        {
            return _usuarioDA.InicioSesionUsuario(email, contrasena);
        }



        public Task<UsuarioRequest> BuscarUsuarioPorEmail(string email)
        {
            return _usuarioDA.BuscarUsuarioPorEmail(email);
        }

        public async Task<PagedResult<UsuarioResponse>> GetUsuariosPaginadosAsync(int page, int limit, string search, int? roleId)
        {


            return await _usuarioDA.GetUsuariosPaginadosAsync(page, limit, search, roleId);

        }

        public async Task<int> EditarAdmin(int Id, UsuarioResponse usuario)
        {
            return await _usuarioDA.EditarAdmin(Id, usuario);
        }

        public async Task<int> ActualizarEstadoDeUsuario(int Id, int estado)
        {
            return await _usuarioDA.ActualizarEstadoDeUsuario(Id, estado);
        }
        

    }
}
