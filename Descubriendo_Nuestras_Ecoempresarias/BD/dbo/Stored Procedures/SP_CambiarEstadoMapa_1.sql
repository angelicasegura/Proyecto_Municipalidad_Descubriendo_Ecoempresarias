CREATE PROCEDURE SP_CambiarEstadoMapa
    @Mapa_id INT,
	@Estado_id INT 
AS
BEGIN
    SET NOCOUNT ON;
	BEGIN TRY

	 -- Validar que el mapa exista
        IF NOT EXISTS (
            SELECT 1
            FROM ECOEMPRESARIAS_MAPAS_TB
            WHERE Mapa_id = @Mapa_id
        )
        BEGIN
            RAISERROR('Error: El mapa que intenta eliminar no existe.',16,1);
            RETURN;
        END


	BEGIN TRANSACTION

        UPDATE ECOEMPRESARIAS_MAPAS_TB
        SET
            Estado_id = @Estado_id
        WHERE Mapa_id = @Mapa_id;

		SELECT @Mapa_id;

    COMMIT TRANSACTION;
	END TRY

  BEGIN CATCH

    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
    RAISERROR(@ErrorMessage,16,1);

END CATCH
END