CREATE PROCEDURE SP_ObtenerMapas
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        SELECT 
            M.Mapa_id,
            M.Nombre,
            M.Alto,
            M.Ancho,
            M.Escala,
            E.Nombre AS EstadoNombre
        FROM ECOEMPRESARIAS_MAPAS_TB M
        INNER JOIN ECOEMPRESARIAS_ESTADOS_TB E
            ON M.Estado_id = E.Estado_id
        ORDER BY M.Nombre;

    END TRY

    BEGIN CATCH

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage,16,1);

    END CATCH

END