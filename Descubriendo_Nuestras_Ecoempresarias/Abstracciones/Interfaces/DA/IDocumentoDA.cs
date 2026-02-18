using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.DA
{
    public interface IDocumentoDA
    {
        public Task<Byte[]> EncontrarImagen(String nombreImagen, String carpeta);
        public string ObtenerContentType(string fileName);
    }
}
