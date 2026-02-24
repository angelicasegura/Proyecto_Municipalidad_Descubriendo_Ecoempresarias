using Abstracciones.Modelos;
using Abstracciones.Modelos.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Abstracciones.Modelos.Emprendimiento;

namespace Abstracciones.Interfaces.DA
{
    public interface IEmprendimientoDA
    {
        Task<PagedResult<EmprendimientoResponse>> GetEmprendimientosPaginadosAsync(
    int page,
    int limit,
    string? search,
    int? tipoActividadId,
    int? estadoId
        );

        public Task<int> CrearEmprendimientoAsync(EmprendimientoRequest emprendimiento);

        public Task<bool> VerificarExistenciaEmprendimiento(string CedulaJuridica);

        public Task<EmprendimientoResponse> GetEmprendimientoPorId(string cedulaJuridica);

        public Task<List<EmprendimientoResponse>> GetEmprendimientoPorCedulaUsuario(int cedula, int estado_id);

        public Task<IEnumerable<EmprendimientoResponse>> ObtenerEmprendimientoPorUsuario(int usuario_id);

        public Task<int> EditarEmprendimiento(int id, EmprendimientoRequest emprendimiento);

        public Task<int> EliminarEmprendimeinto(int id);
        Task<int> InactivarOActivarEmprendimientosDeUsuario(int Cedula, int estado_id);
    }
}
