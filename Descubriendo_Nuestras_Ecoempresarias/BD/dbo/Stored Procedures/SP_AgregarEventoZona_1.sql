CREATE PROCEDURE SP_AgregarEventoZona
    @Evento_id INT,
    @Zona_id INT,
    @Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        -- Validar que no exista la relación Evento-Zona
        IF EXISTS(
            SELECT 1
            FROM ECOEMPRESARIAS_EVENTOS_ZONAS_TB
            WHERE Evento_id = @Evento_id
            AND Zona_id = @Zona_id
        )
        BEGIN
            RAISERROR('Error: Esta zona ya está asignada a este evento.',16,1);
            RETURN;
        END

        BEGIN TRANSACTION

        INSERT INTO ECOEMPRESARIAS_EVENTOS_ZONAS_TB
            (Evento_id, Zona_id, Estado_id)
        VALUES
            (@Evento_id, @Zona_id, @Estado_id);

			SELECT @Zona_id

        COMMIT TRANSACTION

    END TRY

    BEGIN CATCH

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage,16,1);

    END CATCH

END