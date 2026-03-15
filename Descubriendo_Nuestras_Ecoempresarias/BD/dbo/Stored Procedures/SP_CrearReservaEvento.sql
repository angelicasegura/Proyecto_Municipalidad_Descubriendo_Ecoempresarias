CREATE PROCEDURE SP_CrearReservaEvento
@Evento_id INT,
@Emprendimiento_id INT,
@Nombre NVARCHAR(100),
@Apellidos NVARCHAR(100),
@Cedula NVARCHAR(50),
@NombreEmprendimiento NVARCHAR(200),
@Productos NVARCHAR(500),
@Correo NVARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO ECOEMPRESARIAS_RESERVA_EVENTOS_TB
    (
        Evento_id,
        Emprendimiento_id,
        Nombre,
        Apellidos,
        Cedula,
        NombreEmprendimiento,
        Productos,
        Correo,
        Estado_id,
		Fecha_solicitud
    )
    VALUES
    (
        @Evento_id,
        @Emprendimiento_id,
        @Nombre,
        @Apellidos,
        @Cedula,
        @NombreEmprendimiento,
        @Productos,
        @Correo,
        6,
		GETDATE()
    )

END