CREATE PROCEDURE SP_CrearReserva_Evento
@Evento_id int, 
@Emprendimiento_id int 
AS 
BEGIN 
	If not exists (
	select 1 
	from ECOEMPRESARIAS_RESERVA_EVENTOS_TB 
	WHERE Evento_id = @Evento_id
	and Emprendimiento_id = @Emprendimiento_id
	)
BEGIN
	insert into ECOEMPRESARIAS_RESERVA_EVENTOS_TB (Evento_id, Emprendimiento_id, Estado_id)
	values (@Evento_id, @Emprendimiento_id, 6)
END
END