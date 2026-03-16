CREATE PROCEDURE SP_AgregarEventoPiso
    @Evento_id INT,
    @Piso_id INT,
    @Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        -- Validar que no exista ya la combinación Evento-Piso
        IF EXISTS(
            SELECT 1
            FROM ECOEMPRESARIAS_EVENTO_PISOS_TB
            WHERE Evento_id = @Evento_id
            AND Piso_id = @Piso_id
        )
        BEGIN
            RAISERROR('Error: Este piso ya está asignado a este evento.',16,1);
            RETURN;
        END

        BEGIN TRANSACTION

        INSERT INTO ECOEMPRESARIAS_EVENTO_PISOS_TB
            (Evento_id, Piso_id, Estado_id)
        VALUES
            (@Evento_id, @Piso_id, @Estado_id);

			SELECT @Piso_id;

        COMMIT TRANSACTION

    END TRY

    BEGIN CATCH

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage,16,1);

    END CATCH

END