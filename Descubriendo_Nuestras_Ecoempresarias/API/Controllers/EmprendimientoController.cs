using Abstracciones.Interfaces.Flujo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using static Abstracciones.Modelos.Emprendimiento;

namespace API.Controllers
{
    [Route("api/emprendimientos")]
    [ApiController]
    public class EmprendimientoController : ControllerBase
    {

        private readonly IEmprendimientoFlujo _emprendimientoFlujo;

        public EmprendimientoController(IEmprendimientoFlujo emprendimientoFlujo)
        {
            _emprendimientoFlujo = emprendimientoFlujo;
        }

        [HttpGet("paginados")]
        public async Task<IActionResult> GetEmprendimientosPaginados(
        [FromQuery] int page = 1,
        [FromQuery] int limit = 10,
        [FromQuery] string? search = null,
        [FromQuery] int? tipoActividadId = null,
        [FromQuery] int? estadoId = null)
        {
            try
            {
                
                if (page <= 0) page = 1;
                if (limit <= 0 || limit > 100) limit = 10;

                var resultado = await _emprendimientoFlujo.GetEmprendimientosPaginadosAsync(
                    page,
                    limit,
                    search,
                    tipoActividadId,
                    estadoId
                );

                var totalRecord = resultado.TotalCount;
                var totalPages = (int)Math.Ceiling((double)totalRecord / limit);
                if (resultado == null || !resultado.Items.Any())
                {
                    return Ok(new
                    {
                        items = new List<EmprendimientoResponse>(),
                        totalCount = 0,
                        totalPages = 0,
                        currentPage = page,
                        pageSize = limit
                    });
                }

                return Ok(new
                {
                    items = resultado.Items,
                    totalCount = resultado.TotalCount,
                    totalPages = totalPages,
                    currentPage = page,
                    pageSize = limit
                });
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, $"Error interno al obtener emprendimientos: {ex.Message}");
            }
        }



    }
}
