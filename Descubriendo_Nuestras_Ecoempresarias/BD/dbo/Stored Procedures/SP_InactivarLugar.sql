
CREATE PROCEDURE SP_InactivarLugar
    @Lugar_id INT
AS
BEGIN
    SET NOCOUNT ON;
	BEGIN TRANSACTION

        UPDATE ECOEMPRESARIAS_LUGARES_TB
        SET
            Estado_id = 0
        WHERE Lugar_id = @Lugar_id;

		SELECT @Lugar_id;

    COMMIT TRANSACTION;
END