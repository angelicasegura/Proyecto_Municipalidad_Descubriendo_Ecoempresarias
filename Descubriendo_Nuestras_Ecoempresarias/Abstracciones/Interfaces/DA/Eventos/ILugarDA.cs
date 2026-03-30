using Abstracciones.Modelos.Eventos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.DA.Eventos
{
    public interface ILugarDA
    {
        public Task<int> AgregarLugar(LugarRequest lugar);
        public Task<int> EditarLugar(int id, LugarRequest lugar);
        public Task<int> InactivarLugar(int id);
        public Task<IEnumerable<LugarResponse>> ObtenerLugares();
        public Task<LugarResponse> ObtenerLugarPorId(int id);

    }
}
