
CREATE PROCEDURE [dbo].[sp_EditarUsuarioPorAdmin]
    @IdUsuario INT,
    @Nombre VARCHAR(200),
    @Apellidos VARCHAR(200),
    @Telefono VARCHAR(15),
    @Email VARCHAR(200),
    @Edad VARCHAR(10), -- Coincide con tu modelo C# que usa string
    @IdEstado INT,
    @IdRol INT
AS
BEGIN
    SET NOCOUNT ON;
	
    BEGIN TRY
        UPDATE [dbo].[ECOEMPRESARIAS_USUARIOS_TB]
        SET [Nombre] = @Nombre,
            [Apellidos] = @Apellidos,
            [Telefono] = @Telefono,
            [Email] = @Email,
            [Edad] = TRY_CAST(@Edad AS INT), 
            [Estado_id] = @IdEstado,
            [Rol_id] = @IdRol
        WHERE [Usuario_id] = @IdUsuario;

        -- Retornamos el registro actualizado con los ALIAS correctos para UsuarioResponse
        SELECT 
            Usuario_id AS IdUsuario,
            Nombre,
            Apellidos,
            Telefono,
            Email,
            Edad,
            Estado_id AS IdEstado,
            Rol_id AS IdRol,
            Ruta_Imagen_Perfil
        FROM [dbo].[ECOEMPRESARIAS_USUARIOS_TB]
        WHERE Usuario_id = @IdUsuario;

    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END