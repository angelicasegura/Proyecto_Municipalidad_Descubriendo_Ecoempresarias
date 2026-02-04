
CREATE PROCEDURE [dbo].[sp_ObtenerTiposActividad]
    @SoloActivos BIT = 1 
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        [TipoActividad_id] AS TipoActividadId,
        [Nombre],
        [Descripcion],
        [Estado_id] AS EstadoId
    FROM [dbo].[ECOEMPRESARIAS_TIPO_ACTIVIDAD_TB]
    WHERE (@SoloActivos = 0 OR [Estado_id] = 1)
    ORDER BY [Nombre] ASC;
END