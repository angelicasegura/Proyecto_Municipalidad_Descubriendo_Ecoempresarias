
CREATE PROCEDURE SP_AgregarPiso
    @Nombre_piso NVARCHAR(150),
    @Numero_piso INT,
    @Lugar_id INT,
    @Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;

	 BEGIN TRY

	BEGIN TRANSACTION 

    INSERT INTO ECOEMPRESARIAS_PISOS_TB
           (Nombre_piso,
            Numero_piso,
            Lugar_id,
            Estado_id)
             OUTPUT INSERTED.Piso_id
    VALUES
           (@Nombre_piso,
            @Numero_piso,
            @Lugar_id,
            @Estado_id);

	COMMIT TRANSACTION;
	END TRY

  BEGIN CATCH
    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
    RAISERROR(@ErrorMessage,16,1);
END CATCH
END