# Etapa de build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copiar todo el repo
COPY . .

# Ir al backend real
WORKDIR /app/Descubriendo_Nuestras_Ecoempresarias

# Restaurar dependencias
RUN dotnet restore

# Publicar la API
RUN dotnet publish API/API.csproj -c Release -o out

# Etapa de ejecución
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copiar lo publicado
COPY --from=build /app/Descubriendo_Nuestras_Ecoempresarias/out .

# Ejecutar la API
CMD ["dotnet", "API.dll"]
# Copiar lo publicado
COPY --from=build /Proyecto_Municipalidad_Descubriendo_Ecoempresarias/Descubriendo_Nuestras_Ecoempresarias/out .

# Ejecutar la API
CMD ["dotnet", "API.dll"]
