using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;


namespace Flujo
{
    public class UsuarioFlujo : IUsuarioFlujo
    {
        private IUsuarioDA _usuarioDA;

        public UsuarioFlujo(IUsuarioDA usuarioDA)
        {
            _usuarioDA = usuarioDA;

        }


        public Task<int> Agregar(UsuarioRequest usuario)
        {
            throw new NotImplementedException();
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
    }
}
