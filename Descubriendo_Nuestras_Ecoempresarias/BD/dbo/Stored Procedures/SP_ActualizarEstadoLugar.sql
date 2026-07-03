
CREATE PROCEDURE SP_ActualizarEstadoLugar
    @Lugar_id INT,
    @Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    UPDATE ECOEMPRESARIAS_LUGARES_TB
    SET Estado_id = @Estado_id
    WHERE Lugar_id = @Lugar_id;

    SELECT
        Lugar_id,
        Nombre,
        Provincia,
        Canton,
        Distrito,
        Detalles,
        Estado_id
    FROM ECOEMPRESARIAS_LUGARES_TB
    WHERE Lugar_id = @Lugar_id;

    COMMIT TRANSACTION;
END