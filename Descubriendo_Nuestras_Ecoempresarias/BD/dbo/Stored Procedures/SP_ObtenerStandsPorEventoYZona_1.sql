CREATE PROCEDURE SP_ObtenerStandsPorEventoYZona
    @Evento_id INT,
    @Zona_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        SELECT
            E.Evento_id,
            E.NombreEvento,

            Z.Zona_id,
            Z.Nombre AS NombreZona,

            S.Stand_id,
            S.Codigo,
            S.X,
            S.Y,
            S.Ancho,
            S.Alto,
            S.Rotacion,

            EM.Emprendimiento_id,
            EM.Nombre AS NombreEmprendimiento,

            EZS.Estado_id,

			ES.Nombre AS EstadoNombre

        FROM ECOEMPRESARIAS_EVENTOS_ZONAS_STANDS_TB EZS

        INNER JOIN ECOEMPRESARIAS_STANDS_MAPAS_TB S
            ON EZS.Stand_id = S.Stand_id

        INNER JOIN ECOEMPRESARIAS_ZONAS_TB Z
            ON EZS.Zona_id = Z.Zona_id

        INNER JOIN ECOEMPRESARIAS_EVENTOS_TB E
            ON EZS.Evento_id = E.Evento_id

		 INNER JOIN ECOEMPRESARIAS_ESTADOS_TB ES
            ON EZS.Estado_id = ES.Estado_id

        LEFT JOIN ECOEMPRESARIAS_EMPRENDIMIENTOS_TB EM
            ON EZS.Emprendimientos_id = EM.Emprendimiento_id

        WHERE EZS.Evento_id = @Evento_id
        AND EZS.Zona_id = @Zona_id
        AND S.Estado_id = 1

    END TRY

    BEGIN CATCH

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage,16,1);

    END CATCH

END