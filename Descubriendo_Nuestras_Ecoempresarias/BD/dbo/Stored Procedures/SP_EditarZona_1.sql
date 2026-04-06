
CREATE PROCEDURE SP_EditarZona
    @Zona_id INT,
    @Nombre NVARCHAR(150),
    @Descripcion NVARCHAR(MAX),
    @Piso_id INT,
    @Mapa_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        -- Validar que la zona exista
        IF NOT EXISTS (
            SELECT 1
            FROM ECOEMPRESARIAS_ZONAS_TB
            WHERE Zona_id = @Zona_id
        )
        BEGIN
            RAISERROR('Error: La zona que intenta actualizar no existe.',16,1);
            RETURN;
        END

        -- Validar que no exista otra zona con el mismo nombre en el mismo piso
        IF EXISTS (
            SELECT 1
            FROM ECOEMPRESARIAS_ZONAS_TB
            WHERE Nombre = @Nombre
            AND Piso_id = @Piso_id
            AND Zona_id <> @Zona_id
        )
        BEGIN
            RAISERROR('Error: Ya existe otra zona con ese nombre en el mismo piso.',16,1);
            RETURN;
        END

        BEGIN TRANSACTION

        UPDATE ECOEMPRESARIAS_ZONAS_TB
        SET Nombre = @Nombre,
            Descripcion = @Descripcion,
            Piso_id = @Piso_id,
            Mapa_id = @Mapa_id
        WHERE Zona_id = @Zona_id;

        COMMIT TRANSACTION

    END TRY

    BEGIN CATCH

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage,16,1);

    END CATCH

END