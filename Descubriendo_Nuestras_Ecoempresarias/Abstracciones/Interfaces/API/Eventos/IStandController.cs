using Abstracciones.Modelos.Eventos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.API.Eventos
{
    public interface IStandController
    {
        public Task<IActionResult> AgregarStand(StandRequest stand);
        public Task<IActionResult> ActualizarStand(int id, StandRequest stand);
        public Task<IActionResult> InactivarStand(int stand_id);
        public Task<IActionResult> ActivarStand(int stand_id);
        public Task<IActionResult> ObtenerStandPorMapa(int mapa_id);
        public Task<IActionResult> ObtenerStandPorId(int stand_id);
    }
}
