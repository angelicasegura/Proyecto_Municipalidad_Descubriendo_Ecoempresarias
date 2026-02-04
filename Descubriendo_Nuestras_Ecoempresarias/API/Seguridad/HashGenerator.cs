using System.Security.Cryptography;
using System.Text;

namespace API.Seguridad
{
    public static class HashGenerator
    {
        public static class HashHelper
        {
            public static string GenerarHashSHA256(string texto)
            {
                using var sha256 = SHA256.Create();
                var bytes = Encoding.UTF8.GetBytes(texto);
                var hash = sha256.ComputeHash(bytes);

                var sb = new StringBuilder();
                foreach (var b in hash)
                    sb.Append(b.ToString("X2"));

                return sb.ToString();
            }
        }
    }
}
