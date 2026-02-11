using Abstracciones.Interfaces.Servicios;
using Abstracciones.Modelos;
using Microsoft.VisualBasic.FileIO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using System.Net.Mail;
using System.Net;

namespace Flujo.EmaiService
{
    public class EmailService : IEmailService
    {
        //!TODO: ESTO DE MOMENTO VA A IR ACA PERO CUANDO YA HAGAMOS EL PROYECTO DE SERVICIOS VA A IR ALLA

        private readonly EmailSettings _emailService;

        public EmailService(IOptions<EmailSettings> emailSettings)
        {
            _emailService = emailSettings.Value;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            var message = new MailMessage
            {
                From = new MailAddress(_emailService.SenderEmail, _emailService.SenderName),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };
            message.To.Add(new MailAddress(toEmail));

            using var smtpClient = new SmtpClient(_emailService.SmtpServer, _emailService.SmtpPort)
            {
                Credentials = new NetworkCredential(_emailService.Username, _emailService.Password),
                EnableSsl = true
            };
            await smtpClient.SendMailAsync(message);
        }
    }
}
