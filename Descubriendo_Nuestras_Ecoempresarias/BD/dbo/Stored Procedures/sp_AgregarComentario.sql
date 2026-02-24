CREATE PROCEDURE sp_agregarComentario
    
    @Emprendimiento_id int,
    @Texto varchar(500),
    @Usuario_id int, 
    @Calificacion int, 
    @Fecha datetime,
    @Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;
    begin transaction

   INSERT INTO [dbo].[ECOEMPRESARIAS_COMENTARIOS_TB]
           (
           Comentario
           ,Fecha
           ,Calificacion
           ,Emprendimiento_id
           ,Usuario_id
           ,Estado_id)
     VALUES
           ( 
           @Texto, 
           @Fecha, 
           @Calificacion, 
           @Emprendimiento_id,
           @Usuario_id,
           @Estado_id);
    select CAST(SCOPE_IDENTITY() as INT);
    commit transaction
END;