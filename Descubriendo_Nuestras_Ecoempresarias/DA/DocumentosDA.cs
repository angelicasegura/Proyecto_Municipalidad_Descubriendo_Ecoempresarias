using Abstracciones.Interfaces.DA;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace DA
{
    public class DocumentosDA : IDocumentoDA
    {
        private readonly IHostEnvironment _env;

        public DocumentosDA(IHostEnvironment env)
        {
            _env = env;
        }

        public async Task<byte[]> EncontrarImagen(string nombreImagen, string carpeta)
        {
            string rutaCompleta = Path.GetFullPath(
                Path.Combine(_env.ContentRootPath, "..", "uploads", carpeta, nombreImagen)
            );

            if (!File.Exists(rutaCompleta))
                return null;

            return await File.ReadAllBytesAsync(rutaCompleta);
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
