using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Abstracciones.Modelos.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Abstracciones.Modelos.Emprendimiento;

namespace Flujo
{
    public class EmprendimientoFlujo : IEmprendimientoFlujo
    {
        private IEmprendimientoDA _emprendimientoDA;
        public EmprendimientoFlujo(IEmprendimientoDA emprendimientoDA)
        {
            _emprendimientoDA = emprendimientoDA;
        }

        public async Task<int> CrearEmprendimientoAsync(EmprendimientoRequest emprendimiento)
        {
            return await _emprendimientoDA.CrearEmprendimientoAsync(emprendimiento);
        }

        public async Task<PagedResult<EmprendimientoResponse>> GetEmprendimientosPaginadosAsync(int page, int limit, string? search, int? tipoActividadId, int? estadoId)
        {
           return await _emprendimientoDA.GetEmprendimientosPaginadosAsync(page, limit, search, tipoActividadId, estadoId);
        }
    }
}
