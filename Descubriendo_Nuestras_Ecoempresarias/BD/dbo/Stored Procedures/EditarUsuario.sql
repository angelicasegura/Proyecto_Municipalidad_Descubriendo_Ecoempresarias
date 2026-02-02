CREATE PROCEDURE EditarUsuario
    @Usuario_id INT,
    @Nombre VARCHAR(200),
    @Apellidos VARCHAR(200),
    @Telefono VARCHAR(15),
    @Contrasena VARCHAR(200),
    @Email VARCHAR(200),
    @Ruta_Imagen_Perfil VARCHAR(300),
    @Edad INT,
    @Estado_id INT,
    @Rol_id INT
AS
BEGIN
    SET NOCOUNT ON;
	BEGIN TRANSACTION
    UPDATE ECOEMPRESARIAS_USUARIOS_TB
    SET
        Nombre = @Nombre,
        Apellidos = @Apellidos,
        Telefono = @Telefono,
        Contrasena = @Contrasena,
        Email = @Email,
        Ruta_Imagen_Perfil = @Ruta_Imagen_Perfil,
        Edad = @Edad,
        Estado_id = @Estado_id,
        Rol_id = @Rol_id
    WHERE Usuario_id = @Usuario_id;
	SELECT @Usuario_id 
	COMMIT TRANSACTION

END;