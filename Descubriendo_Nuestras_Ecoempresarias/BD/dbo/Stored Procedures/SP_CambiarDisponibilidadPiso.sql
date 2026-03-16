CREATE PROCEDURE SP_CambiarDisponibilidadPiso
    @Evento_id INT,
    @Piso_id INT,
	@Estado_id INT 
AS
BEGIN
    SET NOCOUNT ON;
	BEGIN TRY

	 -- Validar que el mapa exista
        IF NOT EXISTS (
            SELECT 1
            FROM ECOEMPRESARIAS_EVENTO_PISOS_TB
            WHERE Evento_id = @Evento_id
			AND Piso_id = @Piso_id
        )
        BEGIN
            RAISERROR('Error: El stand que intenta cambiar no existe.',16,1);
            RETURN;
        END


	BEGIN TRANSACTION

        UPDATE ECOEMPRESARIAS_EVENTO_PISOS_TB
        SET
            Estado_id = @Estado_id
        WHERE Evento_id = @Evento_id
			AND Piso_id = @Piso_id

		SELECT @Piso_id;

    COMMIT TRANSACTION;
	END TRY

  BEGIN CATCH

    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
    RAISERROR(@ErrorMessage,16,1);

END CATCH
END