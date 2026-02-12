using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.Flujo
{
        public interface IDocumentoFlujo
    {
        Task<Byte[]> EncontrarImagen(String nombreImagen, String carpeta);
    }
}
