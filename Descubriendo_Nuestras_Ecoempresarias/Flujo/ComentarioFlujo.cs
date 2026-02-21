using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flujo
{
    public class ComentarioFlujo : IComentarioFlujo
    {
        private readonly IComentarioDA _comentarioDA;

        public ComentarioFlujo(IComentarioDA comentarioDA)
        {
            _comentarioDA = comentarioDA;
        }

        public Task<int> Agregar(ComentarioRequest comentario)
        {
            comentario.Fecha = DateTime.Now;
            return _comentarioDA.Agregar(comentario);
        }

        public Task<Guid> Editar(Guid Id, ComentarioRequest comentario)
        {
            return _comentarioDA.Editar(Id, comentario);
        }

        public Task<int> Eliminar(int Comentario_id)
        {
            return _comentarioDA.Eliminar(Comentario_id);
        }

        public Task<List<ComentarioResponse>> ObtenerPorEmprendedor(int Emprendimiento_id)
        {
            return _comentarioDA.ObtenerPorEmprendedor(Emprendimiento_id);
        }

       

        public Task<int?> ObtenerUsuarioIdPorComentario(int Comentario_id)
        {
            return _comentarioDA.ObtenerUsuarioIdPorComentario(Comentario_id);
        }

        Task<ComentarioResponse> IComentarioFlujo.ObtenerPorId(int Id)
        {
            throw new NotImplementedException();
        }
    }
}
