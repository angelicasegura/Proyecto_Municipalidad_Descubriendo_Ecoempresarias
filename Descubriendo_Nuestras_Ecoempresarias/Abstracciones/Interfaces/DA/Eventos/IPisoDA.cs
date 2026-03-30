using Abstracciones.Modelos.Eventos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.DA.Eventos
{
    public interface IPisoDA
    {
        public Task<int> AgregarPiso(PisoRequest piso);
        public Task<int> EditarPiso(int id, PisoRequest piso);
        public Task<int> InactivarPiso(int id);
        public Task<IEnumerable<PisoResponse>> ObtenerPisosPorLugar(int lugar_id);
        public Task<PisoResponse> ObtenerPisoPorId(int id);

    }
}
