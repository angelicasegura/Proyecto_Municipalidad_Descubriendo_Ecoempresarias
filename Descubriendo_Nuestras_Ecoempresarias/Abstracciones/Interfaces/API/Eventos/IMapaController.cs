using Abstracciones.Modelos.Eventos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.API.Eventos
{
    public interface IMapaController
    {

        public Task<IActionResult> AgregarMapa(MapaRequest mapa);
        public Task<IActionResult> EditarMapa(int id, MapaRequest mapa);
        public Task<IActionResult> InactivarMapa(int mapa_id);
        public Task<IActionResult> ActivarMapa(int mapa_id);
        public Task<IActionResult> ObtenerMapas();
        public Task<IActionResult> ObtenerMapaPorId(int mapa_id);
    }
}
