CREATE PROCEDURE spCrearEmprendimiento
    @Usuario_id INT,
    @TipoActividad_id INT,
    @Estado_id INT,
    @Nombre VARCHAR(200),
    @Cedula_Juridica VARCHAR(12),
    @Telefono VARCHAR(15),
    @Email VARCHAR(200),
    @Direccion VARCHAR(500),
    @Ruta_Imagen_Logo NVARCHAR(MAX) = NULL,
    @Descripcion NVARCHAR(100) = NULL
AS
BEGIN
    begin transaction;
    SET NOCOUNT ON;
    DECLARE @NuevoId INT;
    DECLARE @Existe INT = 1;

   
    WHILE @Existe > 0
    BEGIN
        --puede que haya cambiarlo depende la muni
        SET @NuevoId = ABS(CHECKSUM(NEWID())) % 1000000 + 1;
        
        SELECT @Existe = COUNT(*) 
        FROM ECOEMPRESARIAS_EMPRENDIMIENTOS_TB 
        WHERE Emprendimiento_id = @NuevoId;
    END

            IF EXISTS (
            SELECT 1 
            FROM ECOEMPRESARIAS_EMPRENDIMIENTOS_TB
            WHERE Cedula_Juridica = @Cedula_Juridica
        )
        BEGIN
            RAISERROR('Ya existe un emprendimiento con esa cédula jurídica', 16, 1);
            RETURN;
END
    
        INSERT INTO ECOEMPRESARIAS_EMPRENDIMIENTOS_TB (
            Emprendimiento_id,
            Cedula_Juridica,
            Telefono,
            Email,
            Estado_id,
            Nombre,
            Direccion,
            TipoActividad_id,
            Usuario_id,
            Descripcion,
            Ruta_Imagen_Logo
        )
        VALUES (
            @NuevoId, 
            @Cedula_Juridica, 
            @Telefono, 
            @Email, 
            @Estado_id, 
            @Nombre, 
            @Direccion, 
            @TipoActividad_id, 
            @Usuario_id,
            @Descripcion,
                        @Ruta_Imagen_Logo
        );

      
        SELECT @NuevoId AS Emprendimiento_id;

        commit transaction;
END;