	CREATE PROCEDURE SP_EditarLugar
	@Lugar_id int,
    @Nombre nvarchar(200),
    @Provincia nvarchar(200),
    @Canton NVARCHAR(200),
    @Distrito NVARCHAR(200),
    @Detalles NVARCHAR(MAX),
    @Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;
	BEGIN TRANSACTION
  


        UPDATE ECOEMPRESARIAS_LUGARES_TB
        SET
            Nombre = @Nombre,
            Provincia = @Provincia,
            Canton = @Canton,
            Distrito = @Distrito,
            Detalles = @Detalles,
            Estado_id = @Estado_id
        WHERE Lugar_id = @Lugar_id;

 

	SELECT @Lugar_id;
	COMMIT TRANSACTION;
END;