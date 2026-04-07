CREATE PROCEDURE SP_ObtenerZonasPorPisoActivas
    @Piso_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        SELECT
            Z.Zona_id,
            Z.Nombre,
            Z.Descripcion,
            Z.Mapa_id,
            Z.Piso_id,
            P.Nombre_piso AS NombrePiso,
            M.Nombre AS NombreMapa,
            Z.Estado_id,
            E.Nombre AS EstadoNombre
        FROM ECOEMPRESARIAS_ZONAS_TB Z
        INNER JOIN ECOEMPRESARIAS_PISOS_TB P
            ON Z.Piso_id = P.Piso_id
        LEFT JOIN ECOEMPRESARIAS_MAPAS_TB M
			ON Z.Mapa_id = M.Mapa_id
        INNER JOIN ECOEMPRESARIAS_ESTADOS_TB E
            ON Z.Estado_id = E.Estado_id
        WHERE Z.Piso_id = @Piso_id AND Z.Estado_id = 1

    END TRY

    BEGIN CATCH

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage,16,1);

    END CATCH

END