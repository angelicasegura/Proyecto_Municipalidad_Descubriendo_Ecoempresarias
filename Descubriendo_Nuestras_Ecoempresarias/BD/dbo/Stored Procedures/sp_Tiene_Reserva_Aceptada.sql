  create procedure sp_Tiene_Reserva_Aceptada
  @Emprendimiento_id int,
  @Evento_id int
as
begin
SELECT COUNT(1) FROM ECOEMPRESARIAS_RESERVA_EVENTOS_TB 
                     WHERE Emprendimiento_id = @Emprendimiento_id 
                     AND Evento_id = @Evento_id 
                     AND Estado_id = 9
end