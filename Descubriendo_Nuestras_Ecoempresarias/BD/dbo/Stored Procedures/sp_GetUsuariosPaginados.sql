CREATE PROCEDURE sp_GetUsuariosPaginados
    @Page INT ,               
    @Limit INT ,             
    @Search NVARCHAR(200) , 
    @Role INT = NULL            
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Offset INT = (@Page - 1) * @Limit;

    --consulta los usuarios con paginación y filtros
    SELECT Usuario_id as IdUsuario,
           Nombre,
           Apellidos,
           Telefono,
           Email,
           Ruta_Imagen_Perfil,
           Edad,
           Estado_id as IdEstado,
           Rol_id as IdRol
    FROM ECOEMPRESARIAS_USUARIOS_TB
    WHERE (@Search IS NULL 
           OR Nombre LIKE '%' + @Search + '%'
           OR Apellidos LIKE '%' + @Search + '%'
           OR Email LIKE '%' + @Search + '%')
      AND (@Role IS NULL OR Rol_id = @Role)
    ORDER BY Usuario_id
    OFFSET @Offset ROWS
    FETCH NEXT @Limit ROWS ONLY;

    --calcula las paginas totales disponibles
    SELECT COUNT(*) AS Total
    FROM ECOEMPRESARIAS_USUARIOS_TB
    WHERE (@Search IS NULL 
           OR Nombre LIKE '%' + @Search + '%'
           OR Apellidos LIKE '%' + @Search + '%'
           OR Email LIKE '%' + @Search + '%')
      AND (@Role IS NULL OR Rol_id = @Role);
END