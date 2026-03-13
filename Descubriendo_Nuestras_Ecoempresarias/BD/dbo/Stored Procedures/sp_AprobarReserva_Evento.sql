create procedure sp_AprobarReserva_Evento
@Evento_id int,
@Emprendimiento_id int
as 
begin
update ECOEMPRESARIAS_RESERVA_EVENTOS_TB
set Estado_id = 7 
where Evento_id = @Evento_id
and Emprendimiento_id = @Emprendimiento_id
end