using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flujo
{
    public class DocumentoFlujo : IDocumentoFlujo
    {
        private readonly IDocumentoDA _documentoDA;

        public DocumentoFlujo(IDocumentoDA documentoDA)
        {
            _documentoDA = documentoDA;
        }

        public async Task<byte[]> EncontrarImagen(String nombreImagen, String carpeta)
        {
            return await _documentoDA.EncontrarImagen(nombreImagen, carpeta);
        }

        public string ObtenerContentType(string fileName)
        {
            return _documentoDA.ObtenerContentType(fileName);
        }
    }
}
