using Abstracciones.Interfaces.DA.Eventos;
using Abstracciones.Interfaces.Flujo.Eventos;
using Abstracciones.Modelos.Eventos;


namespace Flujo.Eventos
{
    public class LugarFlujo : ILugarFlujo
    {

        private readonly ILugarDA _lugarDA;

        public LugarFlujo(ILugarDA lugarDA)
        {
            _lugarDA = lugarDA;
        }

        public async  Task<int> AgregarLugar(LugarRequest lugar)
        {
            return await _lugarDA.AgregarLugar(lugar);
        }

        public async Task<int> EditarLugar(int id, LugarRequest lugar)
        {
            return await _lugarDA.EditarLugar(id, lugar);
        }

        public async Task<int> InactivarLugar(int id)
        {
            return await _lugarDA.InactivarLugar(id);
        }

        public async Task<IEnumerable<LugarResponse>> ObtenerLugares()
        {
            return await _lugarDA.ObtenerLugares();
        }

        public async Task<LugarResponse> ObtenerLugarPorId(int id)
        {
            return await _lugarDA.ObtenerLugarPorId(id);
        }
    }
}
