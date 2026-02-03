
CREATE PROCEDURE [dbo].[sp_GetEmprendimientosPaginados]
    @Page INT,              
    @Limit INT,              
    @Search NVARCHAR(200),   
    @TipoActividad INT = NULL, 
    @Estado INT = NULL       
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Offset INT = (@Page - 1) * @Limit;

    --  Consulta los emprendiemientos con paginación y filtros
    SELECT 
        E.[Emprendimiento_id] AS EmprendimientoId,
        E.[Nombre],
        E.[Cedula_Juridica] AS CedulaJuridica,
        E.[Telefono],
        E.[Email],
        E.[Direccion],
        E.[Usuario_id] AS UsuarioId,
        E.[Estado_id] AS EstadoId,
        E.[TipoActividad_id] AS TipoActividadId,
        T.[Nombre] AS NombreTipoActividad,
        ES.[Nombre] AS NombreEstado,
        U.[Nombre] + ' ' + U.[Apellidos] AS NombreDuenio
    FROM [dbo].[ECOEMPRESARIAS_EMPRENDIMIENTOS_TB] E
    INNER JOIN [dbo].[ECOEMPRESARIAS_TIPO_ACTIVIDAD_TB] T ON E.TipoActividad_id = T.TipoActividad_id
    INNER JOIN [dbo].[ECOEMPRESARIAS_ESTADOS_TB] ES ON E.Estado_id = ES.Estado_id
    INNER JOIN [dbo].[ECOEMPRESARIAS_USUARIOS_TB] U ON E.Usuario_id = U.Usuario_id
    WHERE (@Search IS NULL 
           OR E.Nombre LIKE '%' + @Search + '%' 
           OR E.Cedula_Juridica LIKE '%' + @Search + '%')
      AND (@TipoActividad IS NULL OR E.TipoActividad_id = @TipoActividad)
      AND (@Estado IS NULL OR E.Estado_id = @Estado)
    ORDER BY E.Emprendimiento_id
    OFFSET @Offset ROWS
    FETCH NEXT @Limit ROWS ONLY;

    --  Consula las paginas totales disponibles
    SELECT COUNT(*) AS Total
    FROM [dbo].[ECOEMPRESARIAS_EMPRENDIMIENTOS_TB] E
    WHERE (@Search IS NULL 
           OR E.Nombre LIKE '%' + @Search + '%' 
           OR E.Cedula_Juridica LIKE '%' + @Search + '%')
      AND (@TipoActividad IS NULL OR E.TipoActividad_id = @TipoActividad)
      AND (@Estado IS NULL OR E.Estado_id = @Estado);
END