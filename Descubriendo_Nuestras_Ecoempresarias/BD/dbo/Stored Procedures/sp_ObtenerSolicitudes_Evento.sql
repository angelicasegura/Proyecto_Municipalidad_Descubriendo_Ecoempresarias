CREATE procedure sp_ObtenerSolicitudes_Evento
as
begin
SELECT
r.Reserva_id as numero,
e.NombreEvento AS Evento, 
r.Nombre, 
r.NombreEmprendimiento as Emprendimiento, 
r.Productos, 
r.Fecha_solicitud,
r.Estado_id,
r.Emprendimiento_id,
r.Evento_id,
est.Nombre AS Estado
FROM ECOEMPRESARIAS_RESERVA_EVENTOS_TB r

INNER JOIN ECOEMPRESARIAS_EVENTOS_TB e
ON r.Evento_id = e.Evento_id
INNER JOIN ECOEMPRESARIAS_ESTADOS_TB est
ON r.Estado_id = est.Estado_id
end