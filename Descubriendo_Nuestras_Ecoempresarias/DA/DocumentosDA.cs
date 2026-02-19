using Abstracciones.Interfaces.DA;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DA
{
    public class DocumentosDA : IDocumentoDA
    {
        private readonly IConfiguration _configuration;

        public DocumentosDA(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<byte[]> EncontrarImagen(String nombreImagen, String carpeta)
        {
            string urlBaseDocuentos = _configuration["LinksDocument:DocumentosLink"];

            string rutaCompletaImagen = $"{urlBaseDocuentos}\\{carpeta}\\{nombreImagen}";

            if (!File.Exists(rutaCompletaImagen))
            {

                return null;
            }
            byte[] archivoBytes = await File.ReadAllBytesAsync(rutaCompletaImagen);

            return archivoBytes;
        }


        public string ObtenerContentType(string fileName)
        {
            var extension = Path.GetExtension(fileName).ToLowerInvariant();

            return extension switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".webp" => "image/webp",
                ".gif" => "image/gif",
                _ => "application/octet-stream"
            };
        }

       
    }
}
