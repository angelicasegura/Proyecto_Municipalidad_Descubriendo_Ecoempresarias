CREATE procedure sp_AprobarReserva_Evento
@Reserva_id int
as 
begin
update ECOEMPRESARIAS_RESERVA_EVENTOS_TB
set Estado_id = 9
where Reserva_id = @Reserva_id
end