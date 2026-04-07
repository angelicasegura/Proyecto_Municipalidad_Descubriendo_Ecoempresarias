# Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY . .

# 🔥 DEBUG: ver estructura real
RUN ls -R

# (dejamos esto para que falle después pero ya vimos la ruta)
RUN dotnet restore Descubriendo_Nuestras_Ecoempresarias/API/API.csproj

# Copiar lo publicado
COPY --from=build /app/out .

# Ejecutar la API
CMD ["dotnet", "API.dll"]
