using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flujo.EmaiService
{

    /// <summary>
    /// Plantillas de correo HTML para cada tipo de notificación.
    /// Para agregar una nueva notificación, solo agrega un método estático acá.
    /// </summary>
    public static class EmailTemplates
    {
        // ─── Colores y estilos base ───────────
        private const string COLOR_PRIMARY = "#056F94";
        private const string COLOR_SUCCESS = "#22c55e";
        private const string COLOR_DANGER = "#ef4444";
        private const string COLOR_WARNING = "#f97316";

        // ─── Layout base reutilizable ─────
        private static string Layout(string contenido, string colorAccento = COLOR_PRIMARY) => $@"
        <!DOCTYPE html>
        <html lang='es'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        </head>
        <body style='margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;'>
            <table width='100%' cellpadding='0' cellspacing='0' style='background:#f4f4f5;padding:32px 0;'>
                <tr>
                    <td align='center'>
                        <table width='560' cellpadding='0' cellspacing='0' style='background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);'>
                            <!-- Header -->
                            <tr>
                                <td style='background:{colorAccento};padding:28px 32px;'>
                                    <h1 style='margin:0;color:#ffffff;font-size:20px;font-weight:700;'>
                                        Ecoempresarias
                                    </h1>
                                    <p style='margin:4px 0 0;color:rgba(255,255,255,0.8);font-size:13px;'>
                                        Sistema Municipal de Emprendimiento
                                    </p>
                                </td>
                            </tr>
                            <!-- Contenido -->
                            <tr>
                                <td style='padding:32px;'>
                                    {contenido}
                                </td>
                            </tr>
                            <!-- Footer -->
                            <tr>
                                <td style='background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;'>
                                    <p style='margin:0;color:#9ca3af;font-size:12px;text-align:center;'>
                                        Este es un correo automático, por favor no respondas a este mensaje.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>";

        private static string Boton(string texto, string color) =>
            $@"<a href='#' style='display:inline-block;margin-top:20px;padding:12px 28px;
               background:{color};color:#fff;border-radius:8px;font-size:14px;
               font-weight:600;text-decoration:none;'>{texto}</a>";

        private static string Badge(string texto, string color) =>
            $@"<span style='display:inline-block;padding:4px 12px;border-radius:20px;
               background:{color}22;color:{color};font-size:13px;font-weight:700;
               border:1px solid {color}44;'>{texto}</span>";

        // ─── 1. Nuevo evento creado → a todos los emprendedores activos ───────
        public static string NuevoEvento(
            string nombreEmprendedor,
            string nombreEvento,
            string fechaInicio,
            string fechaFin,
            string lugar,
            string descripcion)
        {
            var contenido = $@"
                <h2 style='margin:0 0 8px;color:#111827;font-size:22px;'>¡Hay un nuevo evento!</h2>
                <p style='margin:0 0 24px;color:#6b7280;font-size:14px;'>
                    Hola <strong>{nombreEmprendedor}</strong>, te invitamos a participar en el siguiente evento:
                </p>
 
                <div style='background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin-bottom:24px;'>
                    <h3 style='margin:0 0 12px;color:{COLOR_PRIMARY};font-size:18px;'>{nombreEvento}</h3>
                    <table cellpadding='0' cellspacing='0' style='width:100%;'>
                        <tr>
                            <td style='padding:4px 0;color:#374151;font-size:13px;'>📅 <strong>Inicio:</strong> {fechaInicio}</td>
                        </tr>
                        <tr>
                            <td style='padding:4px 0;color:#374151;font-size:13px;'>📅 <strong>Fin:</strong> {fechaFin}</td>
                        </tr>
                        <tr>
                            <td style='padding:4px 0;color:#374151;font-size:13px;'>📍 <strong>Lugar:</strong> {lugar}</td>
                        </tr>
                    </table>
                    <p style='margin:12px 0 0;color:#4b5563;font-size:13px;'>{descripcion}</p>
                </div>
 
                <p style='color:#6b7280;font-size:13px;margin:0;'>
                    Ingresá a la plataforma para solicitar tu participación en el evento.
                </p>";

            return Layout(contenido, COLOR_PRIMARY);
        }

        // ─── 2. Solicitud de evento aprobada ──────────────────────────────────
        public static string SolicitudAprobada(
            string nombreEmprendedor,
            string nombreEmprendimiento,
            string nombreEvento,
            string fechaInicio,
            string lugar)
        {
            var contenido = $@"
                <h2 style='margin:0 0 8px;color:#111827;font-size:22px;'>¡Tu solicitud fue aprobada!</h2>
                <p style='margin:0 0 8px;color:#6b7280;font-size:14px;'>
                    Hola <strong>{nombreEmprendedor}</strong>, tenemos buenas noticias:
                </p>
                {Badge("✅ Solicitud Aprobada", COLOR_SUCCESS)}
 
                <div style='background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:20px;margin:20px 0;'>
                    <p style='margin:0 0 8px;color:#374151;font-size:13px;'>
                        Tu emprendimiento <strong>{nombreEmprendimiento}</strong> ha sido 
                        aprobado para participar en:
                    </p>
                    <h3 style='margin:0 0 12px;color:#15803d;font-size:16px;'>{nombreEvento}</h3>
                    <table cellpadding='0' cellspacing='0'>
                        <tr>
                            <td style='padding:3px 0;color:#374151;font-size:13px;'>📅 <strong>Fecha:</strong> {fechaInicio}</td>
                        </tr>
                        <tr>
                            <td style='padding:3px 0;color:#374151;font-size:13px;'>📍 <strong>Lugar:</strong> {lugar}</td>
                        </tr>
                    </table>
                </div>
 
                <p style='color:#6b7280;font-size:13px;margin:0;'>
                    Ya podés ingresar a la plataforma y seleccionar tu stand para el evento.
                </p>";

            return Layout(contenido, COLOR_SUCCESS);
        }

        // ─── 3. Solicitud de evento rechazada ─────────────────────────────────
        public static string SolicitudRechazada(
            string nombreEmprendedor,
            string nombreEmprendimiento,
            string nombreEvento)
        {
            var contenido = $@"
                <h2 style='margin:0 0 8px;color:#111827;font-size:22px;'>Actualización sobre tu solicitud</h2>
                <p style='margin:0 0 8px;color:#6b7280;font-size:14px;'>
                    Hola <strong>{nombreEmprendedor}</strong>, te informamos lo siguiente:
                </p>
                {Badge("❌ Solicitud Rechazada", COLOR_DANGER)}
 
                <div style='background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:20px;margin:20px 0;'>
                    <p style='margin:0;color:#374151;font-size:13px;'>
                        Lamentablemente la solicitud de tu emprendimiento 
                        <strong>{nombreEmprendimiento}</strong> para participar en 
                        <strong>{nombreEvento}</strong> no fue aprobada en esta ocasión.
                    </p>
                </div>
 
                <p style='color:#6b7280;font-size:13px;margin:0;'>
                    Si tenés alguna consulta podés comunicarte con la municipalidad. 
                    Te invitamos a estar atento a próximos eventos.
                </p>";

            return Layout(contenido, COLOR_DANGER);
        }

        // ─── 4. Stand reservado exitosamente ────────────────
        public static string StandReservado(
            string nombreEmprendedor,
            string nombreEmprendimiento,
            string nombreEvento,
            string nombreZona,
            string codigoStand)
        {
            var contenido = $@"
                <h2 style='margin:0 0 8px;color:#111827;font-size:22px;'>¡Stand reservado!</h2>
                <p style='margin:0 0 8px;color:#6b7280;font-size:14px;'>
                    Hola <strong>{nombreEmprendedor}</strong>, tu reserva fue registrada exitosamente:
                </p>
                {Badge("✅ Reserva Confirmada", COLOR_SUCCESS)}
 
                <div style='background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:20px;margin:20px 0;'>
                    <table cellpadding='0' cellspacing='0' style='width:100%;'>
                        <tr>
                            <td style='padding:4px 0;color:#374151;font-size:13px;'>
                                🏪 <strong>Emprendimiento:</strong> {nombreEmprendimiento}
                            </td>
                        </tr>
                        <tr>
                            <td style='padding:4px 0;color:#374151;font-size:13px;'>
                                🎪 <strong>Evento:</strong> {nombreEvento}
                            </td>
                        </tr>
                        <tr>
                            <td style='padding:4px 0;color:#374151;font-size:13px;'>
                                📍 <strong>Zona:</strong> {nombreZona}
                            </td>
                        </tr>
                        <tr>
                            <td style='padding:4px 0;color:#374151;font-size:13px;'>
                                🪧 <strong>Stand:</strong> {codigoStand}
                            </td>
                        </tr>
                    </table>
                </div>
 
                <p style='color:#6b7280;font-size:13px;margin:0;'>
                    Recordá presentarte el día del evento en tu stand asignado.
                </p>";

            return Layout(contenido, COLOR_SUCCESS);
        }

        // ─── 5. Reserva de stand cancelada ───────────────
        public static string StandDesocupado(
            string nombreEmprendedor,
            string nombreEmprendimiento,
            string nombreEvento,
            string codigoStand)
        {
            var contenido = $@"
                <h2 style='margin:0 0 8px;color:#111827;font-size:22px;'>Reserva cancelada</h2>
                <p style='margin:0 0 8px;color:#6b7280;font-size:14px;'>
                    Hola <strong>{nombreEmprendedor}</strong>, tu reserva fue cancelada:
                </p>
                {Badge("🔓 Stand Liberado", COLOR_WARNING)}
 
                <div style='background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:20px;margin:20px 0;'>
                    <table cellpadding='0' cellspacing='0' style='width:100%;'>
                        <tr>
                            <td style='padding:4px 0;color:#374151;font-size:13px;'>
                                🏪 <strong>Emprendimiento:</strong> {nombreEmprendimiento}
                            </td>
                        </tr>
                        <tr>
                            <td style='padding:4px 0;color:#374151;font-size:13px;'>
                                🎪 <strong>Evento:</strong> {nombreEvento}
                            </td>
                        </tr>
                        <tr>
                            <td style='padding:4px 0;color:#374151;font-size:13px;'>
                                🪧 <strong>Stand liberado:</strong> {codigoStand}
                            </td>
                        </tr>
                    </table>
                </div>
 
                <p style='color:#6b7280;font-size:13px;margin:0;'>
                    Si fue un error podés volver a seleccionar un stand desde la plataforma 
                    mientras haya disponibilidad.
                </p>";

            return Layout(contenido, COLOR_WARNING);
        }
    }
}
