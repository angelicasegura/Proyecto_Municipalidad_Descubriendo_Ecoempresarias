CREATE PROCEDURE SP_CambiarEstadoStand
    @Stand_id INT,
	@Estado_id INT 
AS
BEGIN
    SET NOCOUNT ON;
	BEGIN TRY

	 -- Validar que el stand exista
        IF NOT EXISTS (
            SELECT 1
            FROM ECOEMPRESARIAS_STANDS_MAPAS_TB
            WHERE Stand_id = @Stand_id
        )
        BEGIN
            RAISERROR('Error: El stand que intenta eliminar no existe.',16,1);
            RETURN;
        END


	BEGIN TRANSACTION

        UPDATE ECOEMPRESARIAS_STANDS_MAPAS_TB
        SET
            Estado_id = @Estado_id
        WHERE Stand_id = @Stand_id;

		SELECT @Stand_id;

    COMMIT TRANSACTION;
	END TRY

  BEGIN CATCH

    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
    RAISERROR(@ErrorMessage,16,1);

END CATCH
END