# Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY . .

# 🔥 DEBUG (solo para ver estructura)
RUN ls -R

# ⚠️ AJUSTAR ESTA RUTA DESPUÉS DE VER EL LOG
RUN dotnet restore Descubriendo_Nuestras_Ecoempresarias/API/API.csproj
RUN dotnet publish Descubriendo_Nuestras_Ecoempresarias/API/API.csproj -c Release -o /app/out

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/out .

CMD ["dotnet", "API.dll"]
