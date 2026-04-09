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

    -- 1️⃣ Verificar que el evento esté activo
    IF NOT EXISTS (
        SELECT 1
        FROM ECOEMPRESARIAS_EVENTOS_TB
        WHERE Evento_id = @Evento_id
        AND Estado_id = 1
    )
    BEGIN
        RAISERROR('El evento no está activo o no existe',16,1)
        RETURN
    END

    -- 2️⃣ Verificar que el emprendimiento esté activo
    IF NOT EXISTS (
        SELECT 1
        FROM ECOEMPRESARIAS_EMPRENDIMIENTOS_TB
        WHERE Emprendimiento_id = @Emprendimiento_id
        AND Estado_id = 1
    )
    BEGIN
        RAISERROR('El emprendimiento no está activo o no existe',16,1)
        RETURN
    END

    -- 3️⃣ Verificar que el emprendimiento no haya reservado el evento
    IF EXISTS (
        SELECT 1
        FROM ECOEMPRESARIAS_RESERVA_EVENTOS_TB
        WHERE Evento_id = @Evento_id
        AND Emprendimiento_id = @Emprendimiento_id
    )
    BEGIN
        RAISERROR('Este emprendimiento ya tiene una reserva para este evento',16,1)
        RETURN
    END


    -- 4️⃣ Insertar reserva
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
        8,
        GETDATE()
    )

END