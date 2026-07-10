CREATE PROCEDURE ObtenerUsuarioPorEmail
    @Email VARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT [Usuario_id] AS IdUsuario,
           [Nombre],
           [Apellidos],
           [Telefono],
           [Contrasena],
           [Email],
           [Ruta_Imagen_Perfil],
           [Edad],
           [Estado_id] AS IdEstado,
           [Rol_id] AS IdRol
    FROM [dbo].[ECOEMPRESARIAS_USUARIOS_TB]
    WHERE Email = @Email;
END