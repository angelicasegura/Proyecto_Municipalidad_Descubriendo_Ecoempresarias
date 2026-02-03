
CREATE PROCEDURE ObtenerRolPorId
    @Rol_id INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        Rol_id,
        Nombre,
        Estado_id
    FROM dbo.ECOEMPRESARIAS_ROLES_TB
    WHERE Rol_id = @Rol_id;
END