CREATE PROCEDURE sp_ObtenerComentarioPorId
	@ComentarioId INT
	AS
	Begin 
	set nocount on
	Select * from ECOEMPRESARIAS_COMENTARIOS_TB
	where COMENTARIO_ID = @ComentarioId
	End
