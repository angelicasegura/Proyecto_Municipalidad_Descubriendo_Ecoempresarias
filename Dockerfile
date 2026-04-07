# Etapa de build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /Proyecto_Municipalidad_Descubriendo_Ecoempresarias

# Copiar todo el repo
COPY . .

# Ir al backend
WORKDIR /Proyecto_Municipalidad_Descubriendo_Ecoempresarias/Descubriendo_Nuestras_Ecoempresarias

# Restaurar dependencias
RUN dotnet restore

# Publicar la API
RUN dotnet publish API/API.csproj -c Release -o out

# Etapa de ejecución
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /Proyecto_Municipalidad_Descubriendo_Ecoempresarias

# Copiar lo publicado
COPY --from=build /Proyecto_Municipalidad_Descubriendo_Ecoempresarias/Descubriendo_Nuestras_Ecoempresarias/out .

# Ejecutar la API
CMD ["dotnet", "API.dll"]
