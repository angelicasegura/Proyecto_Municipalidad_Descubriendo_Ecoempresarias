using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Interfaces.Servicios;
using Abstracciones.Modelos;
using API.Controllers;
using API.Helpers;
using API.Seguridad;
using DA;
using DA.Repositorios;
using Flujo;
using Flujo.EmaiService;
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
                    "http://localhost:5173",    // Vite http
                    "https://localhost:5173",   // Vite https (por si acaso)
                    "https://localhost:7050",   // Swagger https
                    "http://localhost:5090"     // API http (por si se prueba sin https)
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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
    });
}

app.UseCors("AllowViteApp");

app.UseHttpsRedirection();
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();