CREATE PROCEDURE [dbo].[SP_EditarInformacionGeneralProducto]
    @Producto_id UNIQUEIDENTIFIER,
    @NombreProducto VARCHAR(200),
    @Descripcion VARCHAR(500),
    @Ruta_Imagen VARCHAR(300),
    @Precio DECIMAL(10,2),
    @Categoria_id UNIQUEIDENTIFIER,
    @Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;
	BEGIN TRANSACTION
  


        UPDATE ECOEMPRESARIAS_PRODUCTO_TB
        SET
            NombreProducto = @NombreProducto,
            Descripcion = @Descripcion,
            Ruta_Imagen = @Ruta_Imagen,
            Precio = @Precio,
            Categoria_id = @Categoria_id,
            Estado_id = @Estado_id
        WHERE Producto_id = @Producto_id;

 

	SELECT @Producto_id;
	COMMIT TRANSACTION;
END;