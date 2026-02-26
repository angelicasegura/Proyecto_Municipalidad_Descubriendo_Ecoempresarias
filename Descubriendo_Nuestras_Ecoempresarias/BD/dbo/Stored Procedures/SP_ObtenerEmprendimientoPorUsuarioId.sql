CREATE PROCEDURE SP_ObtenerEmprendimientoPorUsuarioId
    @UsuarioId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT Emprendimiento_id AS EmprendimientoId, 
     Ruta_Imagen_Logo as ruta_Imagen_Logo,
    Nombre, 
    Usuario_id AS UsuarioId
FROM ECOEMPRESARIAS_EMPRENDIMIENTOS_TB 
WHERE Usuario_id = @UsuarioId

END;