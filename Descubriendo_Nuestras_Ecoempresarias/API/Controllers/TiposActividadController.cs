using Abstracciones.Interfaces.Flujo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/TiposActividad")]
    [ApiController]
    public class TiposActividadController : ControllerBase
    {
        private ITiposActividadFlujo _tiposActividadFlujo;
        public TiposActividadController(ITiposActividadFlujo tiposActividadFlujo)
        {
            _tiposActividadFlujo = tiposActividadFlujo;
        }


        [HttpGet]
        public async Task<IActionResult> ObtenerTiposActividad()
        {
            return Ok( await _tiposActividadFlujo.ObtenerTiposActividad());
        }


    }
}
