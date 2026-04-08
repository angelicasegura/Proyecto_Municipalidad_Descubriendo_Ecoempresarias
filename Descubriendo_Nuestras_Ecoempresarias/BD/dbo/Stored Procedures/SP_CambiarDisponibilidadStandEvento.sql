CREATE PROCEDURE SP_CambiarDisponibilidadStandEvento
    @Stand_id INT,
    @Zona_id INT,
    @Evento_id INT,
    @Emprendimientos_id INT,
    @Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        -- Validar que el registro exista
        IF NOT EXISTS(
            SELECT 1
            FROM ECOEMPRESARIAS_EVENTOS_ZONAS_STANDS_TB
            WHERE Stand_id = @Stand_id
            AND Zona_id = @Zona_id
            AND Evento_id = @Evento_id
        )
        BEGIN
            RAISERROR('Error: No existe ese stand asignado a la zona en ese evento.',16,1);
            RETURN;
        END

        BEGIN TRANSACTION

        UPDATE ECOEMPRESARIAS_EVENTOS_ZONAS_STANDS_TB
        SET 
            Emprendimientos_id = @Emprendimientos_id,
            Estado_id = @Estado_id
        WHERE 
            Stand_id = @Stand_id
            AND Zona_id = @Zona_id
            AND Evento_id = @Evento_id;

        COMMIT TRANSACTION

    END TRY

    BEGIN CATCH

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage,16,1);

    END CATCH

END