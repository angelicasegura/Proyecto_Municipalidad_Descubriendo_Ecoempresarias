CREATE PROCEDURE SP_ObtenerPisosPorEventoYEstado
    @Evento_id INT,
	@Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        SELECT
            EP.Evento_id,
            E.Fecha_inicio,
			E.NombreEvento,
            P.Piso_id,
            P.Nombre_piso,
            P.Numero_piso,
            L.Nombre AS NombreLugar,
            EP.Estado_id,
            ES.Nombre AS Estado
        FROM ECOEMPRESARIAS_EVENTO_PISOS_TB EP

        INNER JOIN ECOEMPRESARIAS_PISOS_TB P
            ON EP.Piso_id = P.Piso_id

        INNER JOIN ECOEMPRESARIAS_LUGARES_TB L
            ON P.Lugar_id = L.Lugar_id

        INNER JOIN ECOEMPRESARIAS_EVENTOS_TB E
            ON EP.Evento_id = E.Evento_id

        INNER JOIN ECOEMPRESARIAS_ESTADOS_TB ES
            ON EP.Estado_id = ES.Estado_id

        WHERE EP.Evento_id = @Evento_id AND EP.Estado_id = @Estado_id

    END TRY

    BEGIN CATCH

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage,16,1);

    END CATCH

END