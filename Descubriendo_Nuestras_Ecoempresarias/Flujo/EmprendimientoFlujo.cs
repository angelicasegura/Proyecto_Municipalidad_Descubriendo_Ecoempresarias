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

        public async Task<List<EmprendimientoResponse>> GetEmprendimientoPorCedulaUsuario(int cedula, int estado_id)
        {
            return await _emprendimientoDA.GetEmprendimientoPorCedulaUsuario(cedula, estado_id);
        }

        public async Task<EmprendimientoResponse> GetEmprendimientoPorId(string cedulaJuridica)
        {
            return await _emprendimientoDA.GetEmprendimientoPorId(cedulaJuridica);
        }

        public async Task<PagedResult<EmprendimientoResponse>> GetEmprendimientosPaginadosAsync(int page, int limit, string? search, int? tipoActividadId, int? estadoId)
        {
           return await _emprendimientoDA.GetEmprendimientosPaginadosAsync(page, limit, search, tipoActividadId, estadoId);
        }

        public async Task<int> InactivarOActivarEmprendimientosDeUsuario(int Cedula, int estado_id)
        {
            return await _emprendimientoDA.InactivarOActivarEmprendimientosDeUsuario(Cedula,estado_id);
        }

        public async Task<bool> VerificarExistenciaEmprendimiento(string CedulaJuridica)
        {
            return await _emprendimientoDA.VerificarExistenciaEmprendimiento(CedulaJuridica);
        }
    }
}
