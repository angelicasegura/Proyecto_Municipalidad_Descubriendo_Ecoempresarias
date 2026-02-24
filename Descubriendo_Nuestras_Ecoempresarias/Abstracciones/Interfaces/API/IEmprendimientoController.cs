using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Abstracciones.Modelos.Emprendimiento;

namespace Abstracciones.Interfaces.API
{
    public interface IEmprendimientoController
    {
        public Task<IActionResult> EditarEmprendimiento(int id, EmprendimientoRequest emprendimiento);

        public Task<IActionResult> EliminarEmprendimeinto(int id);

    }
}
