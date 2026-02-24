CREATE PROCEDURE SP_EditarEmprendimiento
    @Emprendimientoid int,
    @TipoActividad_id INT,
    @Nombre VARCHAR(200),
    @Cedula_Juridica VARCHAR(12),
    @Telefono VARCHAR(15),
    @Email VARCHAR(200),
    @Direccion VARCHAR(500),
    @Ruta_Imagen_Logo NVARCHAR(MAX) = NULL,
    @Descripcion NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
	BEGIN TRANSACTION
  


        UPDATE ECOEMPRESARIAS_EMPRENDIMIENTOS_TB
        SET
            Cedula_Juridica = @Cedula_Juridica,
            Telefono = @Telefono,
            Email = @Email,
            Nombre = @Nombre,
            Direccion = @Direccion,
            TipoActividad_id = @TipoActividad_id,
            Descripcion = @Descripcion,
            Ruta_Imagen_Logo = @Ruta_Imagen_Logo
        WHERE Emprendimiento_id = @Emprendimientoid;

 

	SELECT @Emprendimientoid;
	COMMIT TRANSACTION;
END;