# Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY . .

# Restaurar directamente desde raíz
RUN dotnet restore "./Descubriendo_Nuestras_Ecoempresarias/API/API.csproj"

# Publicar
RUN dotnet publish "./Descubriendo_Nuestras_Ecoempresarias/API/API.csproj" -c Release -o /app/out

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/out .

CMD ["dotnet", "API.dll"]

# Copiar lo publicado
COPY --from=build /app/out .

# Ejecutar la API
CMD ["dotnet", "API.dll"]
