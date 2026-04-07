# Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copiar todo el repo
COPY . .

# Restaurar usando el proyecto correcto
RUN dotnet restore Descubriendo_Nuestras_Ecoempresarias/API/API.csproj

# Publicar la API
RUN dotnet publish Descubriendo_Nuestras_Ecoempresarias/API/API.csproj -c Release -o out

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copiar lo publicado
COPY --from=build /app/out .

# Ejecutar la API
CMD ["dotnet", "API.dll"]
