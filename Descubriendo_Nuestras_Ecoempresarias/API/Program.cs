
using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using API.Helpers;
using API.Seguridad;
using DA;
using DA.Repositorios;
using Flujo;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowViteApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // La URL de tu frontend
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

//Auth
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        // AQUÍ se lee la clave secreta
        var secret = builder.Configuration["Jwt:Secret"]
            ?? throw new InvalidOperationException("JWT Secret no configurado.");

        // Asegurar tamaño mínimo de clave
        var keyBytes = Encoding.UTF8.GetBytes(secret);
        if (keyBytes.Length < 32)
        {
            using var sha = SHA256.Create();
            keyBytes = sha.ComputeHash(keyBytes);
        }

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,     // true en prod
            ValidateAudience = false,   // true en prod
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            IssuerSigningKey = new SymmetricSecurityKey(keyBytes),

            // Claims personalizados
            NameClaimType = "nombre",
            RoleClaimType = "rol",

            ClockSkew = TimeSpan.Zero
        };
    });






// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddSingleton<TokenProvider>();
builder.Services.AddScoped<GuardarImagenes>();
builder.Services.AddScoped<IEmprendimientoFlujo, EmprendimientoFlujo>();
builder.Services.AddScoped<ITiposActividadFlujo, TiposActividadFlujo>();
builder.Services.AddScoped<ITiposActividadDA, TiposActividadDA>();
builder.Services.AddScoped<IEmprendimientoDA, EmprendimientoDA>();
builder.Services.AddScoped<IUsuarioFlujo, UsuarioFlujo>();
builder.Services.AddScoped<IUsuarioDA, UsuarioDA>();
builder.Services.AddScoped<IRolesFlujo, RolesFlujo>();
builder.Services.AddScoped<IRolesDA, RolesDA>();
builder.Services.AddScoped<IRepositorioDapper, RepositorioDapper>();
builder.Services.AddScoped<IDocumentoDA, DocumentosDA>();
builder.Services.AddScoped<IDocumentoFlujo, DocumentoFlujo>();



var app = builder.Build();





// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowViteApp");

app.UseHttpsRedirection();
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
