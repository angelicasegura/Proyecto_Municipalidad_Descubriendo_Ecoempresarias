create view vw_EmprendimientosActivos
as
Select	Count (*) As TotalActivos 
From ECOEMPRESARIAS_EMPRENDIMIENTOS_TB
Where Estado_id = 1