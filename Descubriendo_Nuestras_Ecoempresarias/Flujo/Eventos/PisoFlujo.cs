using Abstracciones.Interfaces.DA.Eventos;
using Abstracciones.Interfaces.Flujo.Eventos;
using Abstracciones.Modelos.Eventos;


namespace Flujo.Eventos
{
    public class PisoFlujo : IPisoFlujo
    {
        private readonly IPisoDA _pisoDA;

        public PisoFlujo(IPisoDA pisoDA)
        {
            _pisoDA = pisoDA;
        }

        public async Task<int> AgregarPiso(PisoRequest piso)
        {
            return await _pisoDA.AgregarPiso(piso);
        }

        public async Task<int> EditarPiso(int id, PisoRequest piso)
        {
            return await _pisoDA.EditarPiso(id, piso);
        }

        public async Task<int> InactivarPiso(int id)
        {
            return await _pisoDA.InactivarPiso(id);
        }

        public async Task<PisoResponse> ObtenerPisoPorId(int id)
        {
            return await _pisoDA.ObtenerPisoPorId(id);
        }

        public async Task<IEnumerable<PisoResponse>> ObtenerPisosPorLugar(int lugar_id)
        {
            return await _pisoDA.ObtenerPisosPorLugar(lugar_id);
        }
    }
}
