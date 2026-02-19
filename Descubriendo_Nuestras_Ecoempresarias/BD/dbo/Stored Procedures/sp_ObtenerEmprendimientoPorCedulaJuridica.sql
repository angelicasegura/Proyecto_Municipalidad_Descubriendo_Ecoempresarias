
CREATE   PROCEDURE sp_ObtenerEmprendimientoPorCedulaJuridica
    @Cedula_Juridica NVARCHAR(12)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        E.[Emprendimiento_id] AS EmprendimientoId,
        E.[Nombre],
        E.[Cedula_Juridica] AS CedulaJuridica,
        E.[Telefono],
        E.[Email],
        E.[Direccion],
        E.[Descripcion],
        E.[Ruta_Imagen_Logo],
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
    WHERE [Cedula_Juridica] = @Cedula_Juridica
END