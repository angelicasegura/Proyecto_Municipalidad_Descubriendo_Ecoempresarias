# Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY . .

WORKDIR /app/Descubriendo_Nuestras_Ecoempresarias/API

RUN dotnet restore
RUN dotnet publish -c Release -o /app/out

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/out .

CMD ["dotnet", "API.dll"]
