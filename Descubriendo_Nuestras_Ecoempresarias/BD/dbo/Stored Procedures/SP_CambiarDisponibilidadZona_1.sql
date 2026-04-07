CREATE PROCEDURE SP_CambiarDisponibilidadZona
    @Evento_id INT,
    @Zona_id INT,
	@Estado_id INT 
AS
BEGIN
    SET NOCOUNT ON;
	BEGIN TRY

	 -- Validar que el mapa exista
        IF NOT EXISTS (
            SELECT 1
            FROM ECOEMPRESARIAS_EVENTOS_ZONAS_TB
            WHERE Evento_id = @Evento_id
			AND Zona_id = @Zona_id
        )
        BEGIN
            RAISERROR('Error: El stand que intenta cambiar no existe.',16,1);
            RETURN;
        END


	BEGIN TRANSACTION

        UPDATE ECOEMPRESARIAS_EVENTOS_ZONAS_TB
        SET
            Estado_id = @Estado_id
        WHERE Evento_id = @Evento_id
			AND Zona_id = @Zona_id

		SELECT @Zona_id;

    COMMIT TRANSACTION;
	END TRY

  BEGIN CATCH

    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
    RAISERROR(@ErrorMessage,16,1);

END CATCH
END