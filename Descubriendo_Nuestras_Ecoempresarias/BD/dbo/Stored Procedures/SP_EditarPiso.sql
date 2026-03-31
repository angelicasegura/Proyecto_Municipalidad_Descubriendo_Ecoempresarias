CREATE PROCEDURE SP_EditarPiso
    @Piso_id INT,
    @Nombre_piso NVARCHAR(150),
    @Numero_piso INT,
    @Lugar_id INT,
    @Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;

	BEGIN TRY

	BEGIN TRANSACTION

    UPDATE ECOEMPRESARIAS_PISOS_TB
       SET Nombre_piso = @Nombre_piso,
           Numero_piso = @Numero_piso,
           Lugar_id = @Lugar_id,
           Estado_id = @Estado_id
     WHERE Piso_id = @Piso_id;

	 	SELECT @Piso_id;
	COMMIT TRANSACTION;
	END TRY

  BEGIN CATCH
    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
    RAISERROR(@ErrorMessage,16,1);
END CATCH
END