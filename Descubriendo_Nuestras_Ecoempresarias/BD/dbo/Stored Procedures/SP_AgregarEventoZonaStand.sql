CREATE PROCEDURE SP_AgregarEventoZonaStand
    @Stand_id INT,
    @Zona_id INT,
    @Evento_id INT,
    @Emprendimientos_id INT,
    @Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        -- Validar que no exista la combinación Stand + Zona + Evento
        IF EXISTS(
            SELECT 1
            FROM ECOEMPRESARIAS_EVENTOS_ZONAS_STANDS_TB
            WHERE Stand_id = @Stand_id
            AND Zona_id = @Zona_id
            AND Evento_id = @Evento_id
        )
        BEGIN
            RAISERROR('Error: Este stand ya está asignado a esta zona en este evento.',16,1);
            RETURN;
        END

        BEGIN TRANSACTION

        INSERT INTO ECOEMPRESARIAS_EVENTOS_ZONAS_STANDS_TB
            (Stand_id, Zona_id, Evento_id, Emprendimientos_id, Estado_id)
        VALUES
            (@Stand_id, @Zona_id, @Evento_id, @Emprendimientos_id, @Estado_id);

			SELECT @Stand_id

        COMMIT TRANSACTION

    END TRY

    BEGIN CATCH

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage,16,1);

    END CATCH

END