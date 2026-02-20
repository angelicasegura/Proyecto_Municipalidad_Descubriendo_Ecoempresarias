using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DA
{
    public class ComentarioDA : IComentarioDA
    {

        private IRepositorioDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public ComentarioDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<int> Agregar(ComentarioRequest comentario)
        {
            string query = @"sp_AgregarComentario";
            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<int>(
                query,
                new
                {
                    
                    Emprendimiento_id = comentario.Emprendimiento_id,
                    Texto = comentario.Texto,
                    Calificacion = comentario.Calificacion,
                    Fecha = comentario.Fecha,
                    Estado_id = comentario.Estado_id, 
                    Usuario_id = comentario.Usuario_id

                }
            );
            return resultadoConsulta;
        }

        public Task<Guid> Editar(Guid Id, ComentarioRequest comentario)
        {
            string query = @"sp_EditarComentario";
            var resultadoConsulta = _sqlConnection.ExecuteScalarAsync<Guid>(
                query,
                new
                {
                    Id = Id,
                    Texto = comentario.Texto,
                    Calificacion = comentario.Calificacion,
                    Estado_id = comentario.Estado_id
                }
            );
            return resultadoConsulta;
        }

        public async Task<Guid> Eliminar(Guid Id)
        {
            string query = @"sp_EliminarComentario";
            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<Guid>(
                query,
                new
                {
                    Id = Id
                }
            );
            return resultadoConsulta;
        }

        public Task<List<ComentarioResponse>> ObtenerPorEmprendedor(int Emprendimiento_id)
        {
            throw new NotImplementedException();
        }

        //public Task<List<ComentarioResponse>> ObtenerPorEmprendedor(int Emprendimiento_id)
        //{
        //    string query = @"sp_ObtenerComentariosPorEmprendimiento";
        //    var resultadoConsulta = _sqlConnection.QueryAsync(query, new { Emprendimiento_id = Emprendimiento_id },
        //        commandType: System.Data.CommandType.StoredProcedure);
        //    return resultadoConsulta.ToList();
        //}



    }
}
