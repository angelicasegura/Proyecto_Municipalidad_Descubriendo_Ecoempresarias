using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Abstracciones.Modelos.Pagination;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace DA
{
    public class EmprendimientoDA : IEmprendimientoDA
    {
        private IRepositorioDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public EmprendimientoDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<int> CrearEmprendimientoAsync(Emprendimiento.EmprendimientoRequest emprendimiento)
        {
            string query = @"sp_CrearEmprendimiento";
            var parameters = new
            {
                Usuario_id = emprendimiento.UsuarioId,
                TipoActividad_id = emprendimiento.TipoActividadId,
                Estado_id = emprendimiento.EstadoId,
                Nombre = emprendimiento.Nombre,
                Cedula_Juridica = emprendimiento.CedulaJuridica,
                Telefono = emprendimiento.Telefono,
                Email = emprendimiento.Email,
                Direccion = emprendimiento.Direccion
            };

            try
            {
                return await _sqlConnection.QuerySingleAsync<int>(
                "spCrearEmprendimiento",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el emprendimiento");
            }

        }

        public async Task<PagedResult<Emprendimiento.EmprendimientoResponse>> GetEmprendimientosPaginadosAsync(int page, int limit, string? search, int? tipoActividadId, int? estadoId)
        {
            string query = @"sp_GetEmprendimientosPaginados";
            var parameters = new
            {
                Page = page,
                Limit = limit,
                Search = search,
                TipoActividad = tipoActividadId, 
                Estado = estadoId               
            };

            
            using (var multi = await _sqlConnection.QueryMultipleAsync(query, parameters, commandType: CommandType.StoredProcedure))
            {
                
                var items = await multi.ReadAsync<Emprendimiento.EmprendimientoResponse>();

                
                var totalCount = await multi.ReadFirstAsync<int>();

                return new PagedResult<Emprendimiento.EmprendimientoResponse>
                {
                    Items = items.ToList(),
                    TotalCount = totalCount
                };
            }

        }
    }
}
