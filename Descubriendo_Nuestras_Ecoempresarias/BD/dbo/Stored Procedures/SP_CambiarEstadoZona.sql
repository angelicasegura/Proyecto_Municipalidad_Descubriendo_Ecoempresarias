CREATE PROCEDURE SP_CambiarEstadoZona
    @Zona_id INT,
	@Estado_id INT 
AS
BEGIN
    SET NOCOUNT ON;
	BEGIN TRY

	 -- Validar que lq zona exista
        IF NOT EXISTS (
            SELECT 1
            FROM ECOEMPRESARIAS_ZONAS_TB
            WHERE Zona_id = @Zona_id
        )
        BEGIN
            RAISERROR('Error: La zona que intenta eliminar no existe.',16,1);
            RETURN;
        END


	BEGIN TRANSACTION

        UPDATE ECOEMPRESARIAS_ZONAS_TB
        SET
            Estado_id = @Estado_id
        WHERE Zona_id = @Zona_id;

		SELECT @Zona_id;

    COMMIT TRANSACTION;
	END TRY

  BEGIN CATCH

    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
    RAISERROR(@ErrorMessage,16,1);

END CATCH
END