  CREATE   PROCEDURE sp_ObtenerReservaPorId
    @Reserva_id INT
AS
BEGIN
    SELECT 
	RE.Reserva_id,
	RE.Evento_id,
	RE.Emprendimiento_id,
	RE.Estado_id,
	RE.Nombre,
	RE.Apellidos,
	RE.Cedula,
	RE.NombreEmprendimiento,
	RE.Productos,
	RE.Correo,
	E.NombreEvento
    FROM ECOEMPRESARIAS_RESERVA_EVENTOS_TB RE
	INNER JOIN ECOEMPRESARIAS_EVENTOS_TB E ON RE.Evento_id = E.Evento_id
    WHERE Reserva_id = @Reserva_id
END