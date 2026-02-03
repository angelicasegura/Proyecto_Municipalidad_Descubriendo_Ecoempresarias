using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using DA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flujo
{
    public class RolesFlujo : IRolesFlujo
    {
        private RolesDA _rolesDA;
        public RolesFlujo(RolesDA rolesDA)
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
