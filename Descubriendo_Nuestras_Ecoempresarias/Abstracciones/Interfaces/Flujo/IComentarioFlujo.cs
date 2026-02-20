using Abstracciones.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.Flujo
{
    public interface IComentarioFlujo
    {
        Task<List<ComentarioResponse>> ObtenerPorEmprendedor(int Emprendimiento_id);
        Task<int> Agregar(ComentarioRequest comentario);
        Task<Guid> Editar(Guid Id, ComentarioRequest comentario);
        Task<Guid> Eliminar(Guid Id);
    }
}
