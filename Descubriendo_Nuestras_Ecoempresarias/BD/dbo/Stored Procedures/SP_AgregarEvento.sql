
CREATE PROCEDURE SP_AgregarEvento
    @NombreEvento varchar(200),
    @Descripcion varchar(500),
    @Fecha_inicio DATE,
    @Fecha_final DATE,
    @Horario TIME,
	@Cupos INT,
	@Cupos_actuales INT,
	@Lugar_id INT,
    @Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        -- Validar que el nombre no exista
        IF EXISTS (
            SELECT 1 
            FROM ECOEMPRESARIAS_EVENTOS_TB
            WHERE NombreEvento = @NombreEvento
        )
        BEGIN
            RAISERROR('Error: Ya existe un evento registrado con ese nombre.',16,1);
            RETURN;
        END
		BEGIN TRANSACTION

        -- Insert
        INSERT INTO ECOEMPRESARIAS_EVENTOS_TB
           (NombreEvento,
			Descripcion,
			Fecha_inicio,
			Fecha_final,
			Horario,
			Cupos ,
			Cupos_actuales,
			Lugar_id ,
			Estado_id)
			 OUTPUT INSERTED.Evento_id
		VALUES
			(@NombreEvento,
			@Descripcion,
			@Fecha_inicio ,
			@Fecha_final ,
			@Horario ,
			@Cupos ,
			@Cupos_actuales ,
			@Lugar_id ,
			@Estado_id)

		SELECT Evento_id FROM ECOEMPRESARIAS_EVENTOS_TB WHERE NombreEvento = @NombreEvento;

		COMMIT TRANSACTION

    END TRY

	  BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage,16,1);
    END CATCH

	END