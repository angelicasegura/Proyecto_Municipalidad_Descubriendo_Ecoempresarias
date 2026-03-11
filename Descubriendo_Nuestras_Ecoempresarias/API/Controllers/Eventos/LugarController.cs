using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.API.Eventos;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Interfaces.Flujo.Eventos;
using Abstracciones.Modelos;
using Abstracciones.Modelos.Eventos;
using API.Helpers;
using DA;
using DA.Eventos;
using Flujo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace API.Controllers.Eventos
{
    [Route("api/[controller]")]
    [ApiController]
    public class LugarController : ControllerBase, ILugarController
    {
        private readonly ILugarFlujo _lugarFlujo;
        private readonly IConfiguration _configuration;

        public LugarController(ILugarFlujo lugarFlujo,  IConfiguration configuration)
        {
            _lugarFlujo = lugarFlujo;
            _configuration = configuration;
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPost("CrearLugar")]
        public async Task<IActionResult> AgregarLugar([FromBody] LugarRequest lugar)
        {
            try
            {
                var resultado = await _lugarFlujo.AgregarLugar(lugar);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al crear lugar es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("EditarLugar/{id}")]
        public async Task<IActionResult> EditarLugar([FromRoute]int id, [FromBody] LugarRequest lugar)
        {
            try
            {
                var resultado = await _lugarFlujo.EditarLugar(id, lugar);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al editar lugar es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("InactivarLugar/{id}")]
        public async Task<IActionResult> InactivarLugar([FromRoute] int id)
        {
            try
            {
                var resultado = await _lugarFlujo.InactivarLugar(id);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al inactivar lugar es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("ObtenerLugares")]
        public async Task<IActionResult> ObtenerLugares()
        {
            try
            {
                var resultado = await _lugarFlujo.ObtenerLugares();

                if (!resultado.Any())
                    return NoContent();

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al obtener lugares es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("ObtenerLugarId/{id}")]
        public async Task<IActionResult> ObtenerLugarPorId([FromRoute] int id)
        {
            try
            {
                var resultado = await _lugarFlujo.ObtenerLugarPorId(id);

                if (resultado == null)
                    return NoContent();

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al obtener lugar es: {ex.Message}");
            }
        }
    }
}
