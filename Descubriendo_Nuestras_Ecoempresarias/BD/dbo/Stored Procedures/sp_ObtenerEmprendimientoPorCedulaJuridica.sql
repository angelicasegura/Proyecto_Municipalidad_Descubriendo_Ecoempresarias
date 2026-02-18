
CREATE   PROCEDURE sp_ObtenerEmprendimientoPorCedulaJuridica
    @Cedula_Juridica NVARCHAR(12)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        [Emprendimiento_id],
        [Cedula_Juridica],
        [Telefono],
        [Email],
        [Estado_id],
        [Nombre],
        [Direccion],
        [TipoActividad_id],
        [Usuario_id],
        [Ruta_Imagen_Logo],
        [Descripcion]
    FROM [dbo].[ECOEMPRESARIAS_EMPRENDIMIENTOS_TB]
    WHERE [Cedula_Juridica] = @Cedula_Juridica
END