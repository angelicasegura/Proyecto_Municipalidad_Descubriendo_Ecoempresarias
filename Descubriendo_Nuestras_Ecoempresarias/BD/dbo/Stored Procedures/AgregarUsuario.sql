CREATE PROCEDURE AgregarUsuario
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
    INSERT INTO ECOEMPRESARIAS_USUARIOS_TB
    (
        Usuario_id,
        Nombre,
        Apellidos,
        Telefono,
        Contrasena,
        Email,
        Ruta_Imagen_Perfil,
        Edad,
        Estado_id,
        Rol_id
    )
    VALUES
    (
        @Usuario_id,
        @Nombre,
        @Apellidos,
        @Telefono,
        @Contrasena,
        @Email,
        @Ruta_Imagen_Perfil,
        @Edad,
        @Estado_id,
        @Rol_id
    );
	SELECT @Usuario_id 
	COMMIT TRANSACTION
END;