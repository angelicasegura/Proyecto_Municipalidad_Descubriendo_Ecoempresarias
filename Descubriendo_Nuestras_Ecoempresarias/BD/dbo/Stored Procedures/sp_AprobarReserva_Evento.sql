CREATE procedure sp_AprobarReserva_Evento
	@Reserva_id int
AS 
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        BEGIN TRANSACTION;

        DECLARE @Evento_id INT;
        DECLARE @CuposActuales INT;

        SELECT @Evento_id = Evento_id
        FROM ECOEMPRESARIAS_RESERVA_EVENTOS_TB
        WHERE Reserva_id = @Reserva_id;

        IF (@CuposActuales <= 0)
        BEGIN
            RAISERROR('No hay cupos disponibles para este evento.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        UPDATE ECOEMPRESARIAS_RESERVA_EVENTOS_TB
        SET Estado_id = 9
        WHERE Reserva_id = @Reserva_id;

        UPDATE ECOEMPRESARIAS_EVENTOS_TB
        SET Cupos_actuales = Cupos_actuales - 1
        WHERE Evento_id = @Evento_id;

        COMMIT TRANSACTION;

    END TRY
    BEGIN CATCH

        ROLLBACK TRANSACTION;
        THROW;

    END CATCH
END