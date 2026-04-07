# Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY . .

# 🔥 Entrar a la carpeta correcta
WORKDIR /app/Descubriendo_Nuestras_Ecoempresarias

# ✅ Ahora sí usar ruta RELATIVA correcta
RUN dotnet restore API/API.csproj
RUN dotnet publish API/API.csproj -c Release -o /app/out

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/out .

CMD ["dotnet", "API.dll"]
