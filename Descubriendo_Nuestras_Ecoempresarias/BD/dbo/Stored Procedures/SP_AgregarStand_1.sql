CREATE PROCEDURE SP_AgregarStand
    @Codigo NVARCHAR(50),
    @X INT,
    @Y INT,
    @Ancho INT,
    @Alto INT,
    @Rotacion INT,
    @Mapa_id INT,
    @Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        -- Validar que no exista otro stand con el mismo codigo en el mismo mapa
        IF EXISTS(
            SELECT 1
            FROM ECOEMPRESARIAS_STANDS_MAPAS_TB
            WHERE Codigo = @Codigo
            AND Mapa_id = @Mapa_id
        )
        BEGIN
            RAISERROR('Error: Ya existe un stand con ese código en este mapa.',16,1);
            RETURN;
        END

        BEGIN TRANSACTION

        INSERT INTO ECOEMPRESARIAS_STANDS_MAPAS_TB
            (Codigo, X, Y, Ancho, Alto, Rotacion, Mapa_id, Estado_id)
        OUTPUT INSERTED.Stand_id
        VALUES
            (@Codigo, @X, @Y, @Ancho, @Alto, @Rotacion, @Mapa_id, @Estado_id);

        COMMIT TRANSACTION

    END TRY

    BEGIN CATCH

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage,16,1);

    END CATCH

END