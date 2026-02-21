using Abstracciones.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.DA
{
    public interface IComentarioDA
    {
        Task <List<ComentarioResponse>> ObtenerPorEmprendedor(int Emprendimiento_id);
        Task<int> Agregar(ComentarioRequest comentario); 
        Task <Guid>Editar (Guid Id, ComentarioRequest comentario);
       Task <int>Eliminar (int Comentario_id);
        Task<ComentarioResponse> ObtenerPorId(int Id);
       Task<int?> ObtenerUsuarioIdPorComentario(int Comentario_id);

    }
}
