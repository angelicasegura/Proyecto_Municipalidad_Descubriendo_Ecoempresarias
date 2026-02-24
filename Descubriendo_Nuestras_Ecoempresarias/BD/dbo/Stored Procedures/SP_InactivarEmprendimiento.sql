CREATE PROCEDURE SP_InactivarEmprendimiento
    @Emprendimientoid int
AS
BEGIN
    SET NOCOUNT ON;
	BEGIN TRANSACTION

        UPDATE ECOEMPRESARIAS_EMPRENDIMIENTOS_TB
        SET
            Estado_id = 2
        WHERE Emprendimiento_id = @Emprendimientoid;

		SELECT @Emprendimientoid;

    COMMIT TRANSACTION;
END