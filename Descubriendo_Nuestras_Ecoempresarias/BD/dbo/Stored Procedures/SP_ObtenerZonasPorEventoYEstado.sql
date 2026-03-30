CREATE PROCEDURE SP_ObtenerZonasPorEventoYEstado
    @Evento_id INT,
	@Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        SELECT
            E.Evento_id,
            E.NombreEvento,
            E.Fecha_inicio,

            Z.Zona_id,
            Z.Nombre AS NombreZona,

            P.Piso_id,
            P.Nombre_piso,
            P.Numero_piso,

            M.Mapa_id,
            M.Nombre AS NombreMapa

        FROM ECOEMPRESARIAS_EVENTOS_ZONAS_TB EZ

        INNER JOIN ECOEMPRESARIAS_EVENTOS_TB E
            ON EZ.Evento_id = E.Evento_id

        INNER JOIN ECOEMPRESARIAS_ZONAS_TB Z
            ON EZ.Zona_id = Z.Zona_id

        INNER JOIN ECOEMPRESARIAS_PISOS_TB P
            ON Z.Piso_id = P.Piso_id

        LEFT JOIN ECOEMPRESARIAS_MAPAS_TB M
            ON Z.Mapa_id = M.Mapa_id

        WHERE EZ.Evento_id = @Evento_id AND EZ.Estado_id = @Estado_id

    END TRY

    BEGIN CATCH

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage,16,1);

    END CATCH

END