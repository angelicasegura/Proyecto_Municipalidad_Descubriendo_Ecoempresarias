CREATE PROCEDURE SP_AgregarMapa
    @Nombre NVARCHAR(150),
    @Alto INT,
    @Ancho INT,
    @Escala DECIMAL(10,2),
    @Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        -- Validar que el nombre no exista
        IF EXISTS (
            SELECT 1
            FROM ECOEMPRESARIAS_MAPAS_TB
            WHERE Nombre = @Nombre
        )
        BEGIN
            RAISERROR('Error: Ya existe un mapa registrado con ese nombre.',16,1);
            RETURN;
        END

        BEGIN TRANSACTION

        -- Insert
        INSERT INTO ECOEMPRESARIAS_MAPAS_TB
           (Nombre,
            Alto,
            Ancho,
            Escala,
            Estado_id)
            OUTPUT INSERTED.Mapa_id
        VALUES
           (@Nombre,
            @Alto,
            @Ancho,
            @Escala,
            @Estado_id)

        COMMIT TRANSACTION

    END TRY

    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage,16,1);
    END CATCH

END