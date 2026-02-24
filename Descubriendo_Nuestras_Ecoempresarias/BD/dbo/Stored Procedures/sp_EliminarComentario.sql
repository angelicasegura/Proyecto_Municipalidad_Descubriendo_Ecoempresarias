CREATE PROCEDURE sp_EliminarComentario
	@Comentario_id int
	AS
	BEGIN
	SET NOCOUNT ON;
		DELETE FROM [dbo].[ECOEMPRESARIAS_COMENTARIOS_TB]
		WHERE Comentario_id = @Comentario_id
	END

