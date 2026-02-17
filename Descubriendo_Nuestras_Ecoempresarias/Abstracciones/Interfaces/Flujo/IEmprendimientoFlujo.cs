using Abstracciones.Modelos.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Abstracciones.Modelos.Emprendimiento;

namespace Abstracciones.Interfaces.Flujo
{
    public interface IEmprendimientoFlujo
    {
        Task<PagedResult<EmprendimientoResponse>> GetEmprendimientosPaginadosAsync(
                                                                                        int page,
                                                                                        int limit,
                                                                                        string? search,
                                                                                        int? tipoActividadId,
                                                                                        int? estadoId
                                                                                            );



        Task<int> CrearEmprendimientoAsync(EmprendimientoRequest emprendimiento);
    }
}
