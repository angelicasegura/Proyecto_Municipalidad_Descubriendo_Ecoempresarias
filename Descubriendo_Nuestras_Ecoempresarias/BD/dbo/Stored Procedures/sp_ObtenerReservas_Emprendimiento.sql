create procedure sp_ObtenerReservas_Emprendimiento
@Emprendimiento_id int 
as
begin
select r.Evento_id,
r.Emprendimiento_id, 
r.Estado_id, 
e.NombreEvento,
est.Nombre as Estado 
from ECOEMPRESARIAS_RESERVA_EVENTOS_TB r
join ECOEMPRESARIAS_EVENTOS_TB e on r.Evento_id = e.Evento_id
join ECOEMPRESARIAS_ESTADOS_TB est on r.Estado_id = est.Estado_id
where r.Emprendimiento_id = @Emprendimiento_id
end