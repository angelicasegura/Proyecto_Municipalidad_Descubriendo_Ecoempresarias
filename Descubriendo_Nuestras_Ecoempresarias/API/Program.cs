using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.API.Eventos;
using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.DA.Eventos;
using Abstracciones.Interfaces.DA.Eventos.logica;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Interfaces.Flujo.Eventos;
using Abstracciones.Interfaces.Flujo.Eventos.logica;
using Abstracciones.Interfaces.Servicios;
using Abstracciones.Modelos;
using API.Controllers;
using API.Controllers.Eventos;
using API.Helpers;
using API.Seguridad;
using DA;
using DA.Eventos;
using DA.Eventos.Logica;
using DA.Repositorios;
using Flujo;
using Flujo.EmaiService;
using Flujo.Eventos;
using Flujo.Eventos.Logica;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models; 
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
            policy.WithOrigins(
                    "http://localhost:5173",
                    "http://localhost:5174",
                    "https://localhost:5173",
                    "https://localhost:5174"
                )
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
    // AQU� se lee la clave secreta
    var secret = builder.Configuration["Jwt:Secret"]
        ?? throw new InvalidOperationException("JWT Secret no configurado.");

    // Asegurar tama�o m�nimo de clave
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

builder.Services.Configure<EmailSettings>(
    builder.Configuration.GetSection("EmailSettings"));

builder.Services.AddScoped<IEmailService, EmailService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "API",
        Version = "v1"
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Escriba: Bearer {tu_token}"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

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
builder.Services.AddScoped<IProductoController, ProductoController>();
builder.Services.AddScoped<IProductoDA, ProductoDA>();
builder.Services.AddScoped<IProductoFlujo, ProductoFlujo>();
builder.Services.AddScoped<ICategoriaProductosDA, CategoriaProductosDA>();
builder.Services.AddScoped<ICategoriaProductosFlujo, CategoriaProductosFlujo>();
builder.Services.AddScoped<IInventarioDA, InventarioDA>();
builder.Services.AddScoped<IInventarioFlujo, InventarioFlujo>();
builder.Services.AddScoped<ICarritoDA, CarritoDA>();
builder.Services.AddScoped<ICarritoFlujo, CarritoFlujo>();
builder.Services.AddScoped<IComentarioDA, ComentarioDA>();
builder.Services.AddScoped<IComentarioFlujo, ComentarioFlujo>();
builder.Services.AddScoped<IPedidoDA, PedidoDA>();
builder.Services.AddScoped<IPedidoFlujo, PedidoFlujo>();
builder.Services.AddScoped<IPisoFlujo, PisoFlujo>();
builder.Services.AddScoped<IPisoDA, PisoDA>();
builder.Services.AddScoped<IZonaDA, ZonaDA>();
builder.Services.AddScoped<IZonaFlujo, ZonaFlujo>();
builder.Services.AddScoped<IMapaDA, MapaDA>();
builder.Services.AddScoped<IMapaFlujo, MapaFlujo>();
builder.Services.AddScoped<IStandFlujo, StandFlujo>();
builder.Services.AddScoped<IStandDA, StandDA>();
builder.Services.AddScoped<IPisoEventoDA, EventoPisoDA>();
builder.Services.AddScoped<IEventoPisoFlujo, EventoPisoFlujo>();
builder.Services.AddScoped<ILugarDA, LugarDA>();
builder.Services.AddScoped<ILugarFlujo, LugarFlujo>();
builder.Services.AddScoped<ILugarController, LugarController>();
builder.Services.AddScoped<IEventoDA, EventoDA>();
builder.Services.AddScoped<IEventoFlujo, EventoFlujo>();
builder.Services.AddScoped<IEventoController, EventoController>();
builder.Services.AddScoped<IReservaEventoDA, ReservaEventoDA>();
builder.Services.AddScoped<IReservaEventoFlujo, ReservaEventoFlujo>();
builder.Services.AddScoped<IReporteDA, ReporteDA>();
builder.Services.AddScoped<IReporteFlujo, ReporteFlujo>();
builder.Services.AddScoped<IZonaEventoDA, EventoZonaDA>();
builder.Services.AddScoped<IEventoZonaFlujo, EventoZonaFlujo>();
builder.Services.AddScoped<IEventoZonaStandDA, EventoZonaStandDA>();
builder.Services.AddScoped<IEventoZonaStandFlujo, EventoZonaStandFlujo>();
builder.Services.AddScoped<INotificacionesService, NotificacionService>();

var app = builder.Build();


    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
    });

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowViteApp");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
