CREATE PROCEDURE SP_ObtenerStandsPorId
    @Stand_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        SELECT
            S.Stand_id,
            S.Codigo,
            S.X,
            S.Y,
            S.Ancho,
            S.Alto,
            S.Rotacion,
            E.Nombre AS Estado
        FROM ECOEMPRESARIAS_STANDS_MAPAS_TB S
        INNER JOIN ECOEMPRESARIAS_ESTADOS_TB E
            ON S.Estado_id = E.Estado_id
        WHERE S.Stand_id = @Stand_id

    END TRY

    BEGIN CATCH

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage,16,1);

    END CATCH

END