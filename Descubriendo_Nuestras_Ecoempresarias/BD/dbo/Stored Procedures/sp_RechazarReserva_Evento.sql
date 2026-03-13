create procedure sp_RechazarReserva_Evento
@Evento_id int,
@Emprendimiento_id int
as 
begin
update ECOEMPRESARIAS_RESERVA_EVENTOS_TB
set Estado_id = 8
where Evento_id = @Evento_id
and Emprendimiento_id = @Emprendimiento_id
end