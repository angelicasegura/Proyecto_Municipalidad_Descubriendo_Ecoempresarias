Create procedure sp_ObtenerSolicitudes_Evento
as
begin
SELECT
ROW_NUMBER() OVER (ORDER BY e.Evento_id) AS Numero,
r.Evento_id,
r.Emprendimiento_id,
r.Estado_id,
e.NombreEvento AS Evento,
u.Nombre AS Nombre,
emp.Nombre AS Emprendimiento,
r.Estado_id,
est.Nombre AS Estado
FROM ECOEMPRESARIAS_RESERVA_EVENTOS_TB r

INNER JOIN ECOEMPRESARIAS_EVENTOS_TB e
ON r.Evento_id = e.Evento_id

INNER JOIN ECOEMPRESARIAS_EMPRENDIMIENTOS_TB emp
ON r.Emprendimiento_id = emp.Emprendimiento_id

INNER JOIN ECOEMPRESARIAS_USUARIOS_TB u
ON emp.Usuario_id = u.Usuario_id

INNER JOIN ECOEMPRESARIAS_ESTADOS_TB est
ON r.Estado_id = est.Estado_id
end