# Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY . .

# 🔥 BUSCAR EXACTAMENTE el .csproj real
RUN find . -name "*.csproj"

# ⚠️ DETENER AQUÍ PARA VER EL LOG
RUN exit 1
