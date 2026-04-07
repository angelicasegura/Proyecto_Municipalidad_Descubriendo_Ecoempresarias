CREATE PROCEDURE SP_EditarMapa
    @Mapa_id INT,
    @Nombre NVARCHAR(150),
    @Alto INT,
    @Ancho INT,
    @Escala DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        -- Validar que el mapa exista
        IF NOT EXISTS (
            SELECT 1
            FROM ECOEMPRESARIAS_MAPAS_TB
            WHERE Mapa_id = @Mapa_id
        )
        BEGIN
            RAISERROR('Error: El mapa que intenta actualizar no existe.',16,1);
            RETURN;
        END

        -- Validar que no exista otro mapa con el mismo nombre
        IF EXISTS (
            SELECT 1
            FROM ECOEMPRESARIAS_MAPAS_TB
            WHERE Nombre = @Nombre
            AND Mapa_id <> @Mapa_id
        )
        BEGIN
            RAISERROR('Error: Ya existe otro mapa con ese nombre.',16,1);
            RETURN;
        END

        BEGIN TRANSACTION

        UPDATE ECOEMPRESARIAS_MAPAS_TB
        SET Nombre = @Nombre,
            Alto = @Alto,
            Ancho = @Ancho,
            Escala = @Escala
        WHERE Mapa_id = @Mapa_id;

		SELECT @Mapa_id;

        COMMIT TRANSACTION

    END TRY

     BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage,16,1);
    END CATCH

END