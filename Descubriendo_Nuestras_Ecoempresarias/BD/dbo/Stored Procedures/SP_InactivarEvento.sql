CREATE PROCEDURE SP_InactivarEvento
    @Evento_id INT
AS
BEGIN
    SET NOCOUNT ON;
	BEGIN TRANSACTION

        UPDATE ECOEMPRESARIAS_EVENTOS_TB
        SET
            Estado_id = 0
        WHERE Evento_id = @Evento_id;

		SELECT @Evento_id;

    COMMIT TRANSACTION;
END