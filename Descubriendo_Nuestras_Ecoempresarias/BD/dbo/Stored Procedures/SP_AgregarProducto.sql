CREATE PROCEDURE [dbo].[SP_AgregarProducto]
    @Producto_id UNIQUEIDENTIFIER,
    @NombreProducto VARCHAR(200),
    @Descripcion VARCHAR(500),
    @Descuento DECIMAL(5,2),
    @Ruta_Imagen VARCHAR(300),
    @Precio DECIMAL(10,2),
    @Categoria_id UNIQUEIDENTIFIER,
    @Emprendimiento_id INT,
    @Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        -- Validar que el nombre no exista
        IF EXISTS (
            SELECT 1 
            FROM ECOEMPRESARIAS_PRODUCTO_TB 
            WHERE NombreProducto = @NombreProducto
        )
        BEGIN
            RAISERROR('Error: Ya existe un producto registrado con ese nombre.',16,1);
            RETURN;
        END
		BEGIN TRANSACTION

        -- Insert
        INSERT INTO [dbo].[ECOEMPRESARIAS_PRODUCTO_TB]
        (
            Producto_id,
            NombreProducto,
            Descripcion,
            Descuento,
            Ruta_Imagen,
            Precio,
            Categoria_id,
            Emprendimiento_id,
            Estado_id
        )
        VALUES
        (
            @Producto_id,
            @NombreProducto,
            @Descripcion,
            @Descuento,
            @Ruta_Imagen,
            @Precio,
            @Categoria_id,
            @Emprendimiento_id,
            @Estado_id
        );
		SELECT @Producto_id

		COMMIT TRANSACTION

    END TRY

	  BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage,16,1);
    END CATCH

	END