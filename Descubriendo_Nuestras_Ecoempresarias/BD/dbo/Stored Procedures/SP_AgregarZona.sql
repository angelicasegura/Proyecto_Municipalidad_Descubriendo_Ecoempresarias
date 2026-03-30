CREATE PROCEDURE SP_AgregarZona
    @Nombre NVARCHAR(150),
    @Descripcion NVARCHAR(MAX),
    @Piso_id INT,
    @Mapa_id INT,
    @Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        -- Validar que no exista una zona con el mismo nombre en el mismo piso
        IF EXISTS (
            SELECT 1
            FROM ECOEMPRESARIAS_ZONAS_TB
            WHERE Nombre = @Nombre
            AND Piso_id = @Piso_id
        )
        BEGIN
            RAISERROR('Error: Ya existe una zona con ese nombre en el mismo piso.',16,1);
            RETURN;
        END

        BEGIN TRANSACTION

        INSERT INTO ECOEMPRESARIAS_ZONAS_TB
               (Nombre,
                Descripcion,
                Piso_id,
                Mapa_id,
                Estado_id)
        OUTPUT INSERTED.Zona_id
        VALUES
               (@Nombre,
                @Descripcion,
                @Piso_id,
                @Mapa_id,
                @Estado_id);

        COMMIT TRANSACTION

    END TRY

    BEGIN CATCH

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage,16,1);

    END CATCH

END