CREATE PROCEDURE SP_ActualizarEstadoEvento
    @Evento_id INT,
    @Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    UPDATE ECOEMPRESARIAS_EVENTOS_TB
    SET Estado_id = @Estado_id
    WHERE Evento_id = @Evento_id;

    SELECT
        Evento_id,
        NombreEvento,
        Descripcion,
        Fecha_inicio,
        Fecha_final,
        Horario,
        Cupos,
        Cupos_actuales,
        Lugar_id,
        Estado_id
    FROM ECOEMPRESARIAS_EVENTOS_TB
    WHERE Evento_id = @Evento_id;

    COMMIT TRANSACTION;
END