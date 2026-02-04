
  create procedure [dbo].[sp_ActualizarEstadoUsuario]
	@Usuario_id int,
	@Estado_id int
	as
	begin 
        BEGIN TRANSACTION;
	SET NOCOUNT ON;
	update [dbo].[ECOEMPRESARIAS_USUARIOS_TB]
	set Estado_id = @Estado_id
	where Usuario_id = @Usuario_id

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
        WHERE Usuario_id = @Usuario_id;
	COMMIT TRANSACTION;
    END