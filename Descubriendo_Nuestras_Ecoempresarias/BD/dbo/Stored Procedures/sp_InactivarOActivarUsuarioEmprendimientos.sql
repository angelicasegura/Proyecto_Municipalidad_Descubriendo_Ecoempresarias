CREATE   PROCEDURE sp_InactivarOActivarUsuarioEmprendimientos
    @UsuarioId INT,
	@Estado_id Int 
AS
BEGIN
    SET NOCOUNT ON;
	begin transaction

    -- Inactivar o activar emprendimientos del usuario
    UPDATE emp
    SET emp.Estado_id = @Estado_id
    FROM ECOEMPRESARIAS_EMPRENDIMIENTOS_TB emp
    WHERE emp.Usuario_id = @UsuarioId;

	select @UsuarioId as Id
	commit transaction
END;