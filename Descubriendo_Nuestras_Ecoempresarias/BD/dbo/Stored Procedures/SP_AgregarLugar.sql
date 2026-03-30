
CREATE PROCEDURE SP_AgregarLugar
    @Nombre nvarchar(200),
    @Provincia nvarchar(200),
    @Canton NVARCHAR(200),
    @Distrito NVARCHAR(200),
    @Detalles NVARCHAR(MAX),
    @Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        -- Validar que el nombre no exista
        IF EXISTS (
            SELECT 1 
            FROM ECOEMPRESARIAS_LUGARES_TB
            WHERE Nombre = @Nombre
        )
        BEGIN
            RAISERROR('Error: Ya existe un lugar registrado con ese nombre.',16,1);
            RETURN;
        END
		BEGIN TRANSACTION

        -- Insert
        INSERT INTO ECOEMPRESARIAS_LUGARES_TB
           (Nombre
           ,Provincia
           ,Canton
           ,Distrito
           ,Detalles
           ,Estado_id)
		VALUES
			(@Nombre,
			@Provincia,
			@Canton,
			@Distrito,
			@Detalles,
			@Estado_id)

		SELECT Lugar_id FROM ECOEMPRESARIAS_LUGARES_TB WHERE Nombre = @Nombre;

		COMMIT TRANSACTION

    END TRY

	  BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage,16,1);
    END CATCH

	END