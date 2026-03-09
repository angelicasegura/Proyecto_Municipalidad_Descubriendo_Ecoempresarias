CREATE PROCEDURE sp_Obtener10Emprendedoras
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP 10 
        Nombre,
        Ruta_Imagen_Perfil
    FROM ECOEMPRESARIAS_USUARIOS_TB
    WHERE Rol_id = 2
      AND Estado_id = 1
    ORDER BY Usuario_id; 
END;