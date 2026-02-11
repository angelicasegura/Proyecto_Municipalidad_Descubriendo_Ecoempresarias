namespace API.Helpers
{
    public class GuardarImagenes
    {
        public async Task<string> GuardarImagen(IFormFile imagen, string carpeta)
        {
            var extensionesPermitidas = new[] { ".jpg", ".jpeg", ".png", ".webp" };
            var extension = Path.GetExtension(imagen.FileName).ToLower();

            if (!extensionesPermitidas.Contains(extension))
                throw new Exception("Formato de imagen no permitido");

            if (imagen.Length > 2 * 1024 * 1024)
                throw new Exception("La imagen no puede superar los 2MB");

            var nombreArchivo = $"{Guid.NewGuid()}{extension}";

            var rutaCarpeta = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot",
                "uploads",
                carpeta
            );

            if (!Directory.Exists(rutaCarpeta))
                Directory.CreateDirectory(rutaCarpeta);

            var rutaCompleta = Path.Combine(rutaCarpeta, nombreArchivo);

            using (var stream = new FileStream(rutaCompleta, FileMode.Create))
            {
                await imagen.CopyToAsync(stream);
            }

            // URL pública
            return $"/uploads/{carpeta}/{nombreArchivo}";
        }
    }
}
