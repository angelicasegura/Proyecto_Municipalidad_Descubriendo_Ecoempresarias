CREATE PROCEDURE sp_ObtenerComentariosPorEmprendimiento
	@Emprendimiento_id INT
AS
BEGIN 
SET NOCOUNT ON;
	SELECT 
		C.Comentario_id,
		C.Emprendimiento_id,
		C.Comentario as Texto, 
		C.Calificacion,
		C.Fecha,
		u.Nombre as UsuarioNombre,
		e.Nombre as NombreEstado
	FROM [dbo].[ECOEMPRESARIAS_COMENTARIOS_TB] C
	INNER JOIN [dbo].[ECOEMPRESARIAS_ESTADOS_TB] e ON C.Estado_id = e.Estado_id
	INNER JOIN [dbo].[ECOEMPRESARIAS_USUARIOS_TB] u ON C.Usuario_id = u.Usuario_id
	WHERE C.Emprendimiento_id = @Emprendimiento_id
END