# Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY . .

# Ir donde está la solución
WORKDIR /app/Descubriendo_Nuestras_Ecoempresarias

# Restaurar toda la solución
RUN dotnet restore Descubriendo_Nuestras_Ecoempresarias.slnx

# Publicar el proyecto API (auto detecta dependencias)
RUN dotnet publish API/API.csproj -c Release -o /app/out

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/out .

CMD ["dotnet", "API.dll"]
