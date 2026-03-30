using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.DA
{
    public interface IRepositorioDapper
    {
        SqlConnection ObtenerRepositorio();

        Task<int> EjecutarSp(string nombreSp, object? parametros = null);

        Task<IEnumerable<T>> ObtenerInfo<T>(string nombreSp, object? parametros = null);
    }
}