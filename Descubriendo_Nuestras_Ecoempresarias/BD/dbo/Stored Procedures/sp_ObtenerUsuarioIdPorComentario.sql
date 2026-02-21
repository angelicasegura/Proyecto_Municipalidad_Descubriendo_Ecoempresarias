CREATE PROCEDURE sp_ObtenerUsuarioIdPorComentario
	@Comentario_id INT
	as
	begin
	set NOCOUNT ON
	SELECT USUARIO_ID FROM ECOEMPRESARIAS_COMENTARIOS_TB
	WHERE COMENTARIO_ID = @Comentario_id
	end
