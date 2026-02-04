using Abstracciones.Modelos;
using Abstracciones.Modelos.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.DA
{
    public interface IUsuarioDA
    {
        Task<IEnumerable<UsuarioResponse>> Obtener();
        Task<UsuarioResponse> ObtenerUsuario(int Id);
        Task<int> Agregar(UsuarioRequest usuario);
        Task<int> Editar(int Id, UsuarioRequest usuario);
        Task<int> Eliminar(int Id);
        Task<UsuarioResponse> InicioSesionUsuario(string email, string contrasena);

        Task<PagedResult<UsuarioResponse>> GetUsuariosPaginadosAsync(int page, int limit, string search, int? roleId);

        Task<int> EditarAdmin(int Id, UsuarioResponse usuario);

        Task<int> ActualizarEstadoDeUsuario(int Id, int estado);

    }
}
