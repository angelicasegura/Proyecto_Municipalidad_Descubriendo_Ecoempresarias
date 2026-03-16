CREATE PROCEDURE SP_ActualizarStand
    @Stand_id INT,
    @Codigo NVARCHAR(50),
    @X INT,
    @Y INT,
    @Ancho INT,
    @Alto INT,
    @Rotacion INT,
    @Mapa_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        -- Validar que el stand exista
        IF NOT EXISTS(
            SELECT 1
            FROM ECOEMPRESARIAS_STANDS_MAPAS_TB
            WHERE Stand_id = @Stand_id
        )
        BEGIN
            RAISERROR('Error: El stand que intenta actualizar no existe.',16,1);
            RETURN;
        END

        -- Validar duplicado de codigo en el mismo mapa
        IF EXISTS(
            SELECT 1
            FROM ECOEMPRESARIAS_STANDS_MAPAS_TB
            WHERE Codigo = @Codigo
            AND Mapa_id = @Mapa_id
            AND Stand_id <> @Stand_id
        )
        BEGIN
            RAISERROR('Error: Ya existe otro stand con ese código en este mapa.',16,1);
            RETURN;
        END

        BEGIN TRANSACTION

        UPDATE ECOEMPRESARIAS_STANDS_MAPAS_TB
        SET Codigo = @Codigo,
            X = @X,
            Y = @Y,
            Ancho = @Ancho,
            Alto = @Alto,
            Rotacion = @Rotacion,
            Mapa_id = @Mapa_id
        WHERE Stand_id = @Stand_id;

        COMMIT TRANSACTION

    END TRY

    BEGIN CATCH

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage,16,1);

    END CATCH

END