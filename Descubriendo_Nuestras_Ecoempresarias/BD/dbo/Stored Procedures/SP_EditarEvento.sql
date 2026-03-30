	CREATE PROCEDURE SP_EditarEvento
	@Evento_id int,
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
	BEGIN TRANSACTION
  


        UPDATE ECOEMPRESARIAS_EVENTOS_TB
        SET
            NombreEvento = @NombreEvento,
			Descripcion = @Descripcion,
			Fecha_inicio = @Fecha_inicio,
			Fecha_final = @Fecha_final,
			Horario = @Horario,
			Cupos =  @Cupos,
			Cupos_actuales = @Cupos_actuales,
			Lugar_id = @Lugar_id,
			Estado_id = @Estado_id
        WHERE Evento_id = @Evento_id;

 

	SELECT @Evento_id;
	COMMIT TRANSACTION;
END;