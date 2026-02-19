CREATE PROCEDURE ObtenerUsuario
    @Email VARCHAR(200),
    @Contrasena VARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        Usuario.Usuario_id IdUsuario,
        Usuario.Nombre,
        Usuario.Apellidos,
        Usuario.Telefono,
        Usuario.Contrasena,
        Usuario.Email,
        Usuario.Ruta_Imagen_Perfil,
        Usuario.Edad,
        Usuario.Estado_id IdEstado,
        Usuario.Rol_id IdRol,
        Estado.Nombre AS Estado,
        Rol.Nombre AS Rol
    FROM ECOEMPRESARIAS_USUARIOS_TB Usuario
    INNER JOIN ECOEMPRESARIAS_ESTADOS_TB Estado
        ON Usuario.Estado_id = Estado.Estado_id
    INNER JOIN ECOEMPRESARIAS_ROLES_TB Rol
        ON Usuario.Rol_id = Rol.Rol_id
    WHERE
        Usuario.Email = @Email
        AND Usuario.Contrasena = @Contrasena;
END;