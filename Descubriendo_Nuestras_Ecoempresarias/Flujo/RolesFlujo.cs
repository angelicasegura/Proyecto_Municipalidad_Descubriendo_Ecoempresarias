using Abstracciones.Interfaces.Flujo;
using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;

namespace Flujo
{
    public class RolesFlujo : IRolesFlujo
    {
        private readonly IRolesDA _rolesDA;

        public RolesFlujo(IRolesDA rolesDA)   
        {
            _rolesDA = rolesDA;
        }

        public async Task<Roles?> ObtenerRolPorId(int rolId)
        {
            var resultado = await _rolesDA.ObtenerRolPorId(rolId);
            return resultado;
        }
    }
}

