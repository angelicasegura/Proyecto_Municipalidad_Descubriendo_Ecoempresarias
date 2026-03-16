CREATE PROCEDURE [dbo].[sp_AgregarPedido]
(
    @Usuario_id INT,
    @Emprendimiento_id INT,
    @DireccionEntrega VARCHAR(250),
    @Observaciones VARCHAR(500)
)
AS
BEGIN

SET NOCOUNT ON;

BEGIN TRY
BEGIN TRANSACTION

DECLARE @Carrito_id UNIQUEIDENTIFIER
DECLARE @Factura_id INT
DECLARE @Pedido_id UNIQUEIDENTIFIER = NEWID()

DECLARE @Subtotal DECIMAL(18,2)
DECLARE @IVA DECIMAL(18,2)
DECLARE @Total DECIMAL(18,2)

------------------------------------------------
-- 1 Buscar carrito
------------------------------------------------

SELECT @Carrito_id = Carrito_id
FROM ECOEMPRESARIAS_CARRITO_TB
WHERE Usuario_id = @Usuario_id
AND Emprendimiento_id = @Emprendimiento_id

IF @Carrito_id IS NULL
BEGIN
RAISERROR('El usuario no tiene carrito.',16,1)
ROLLBACK
RETURN
END

------------------------------------------------
-- 2 Validar productos activos y con inventario
------------------------------------------------

IF EXISTS
(
SELECT 1
FROM ECOEMPRESARIAS_PRODUCTOS_POR_CARRITO_TB CPC
JOIN ECOEMPRESARIAS_PRODUCTO_TB P
ON CPC.Producto_id = P.Producto_id
JOIN ECOEMPRESARIAS_INVENTARIO_TB I
ON I.Producto_id = P.Producto_id
WHERE CPC.Carrito_id = @Carrito_id
AND (
P.Estado_id <> 1
OR I.Cantidad_actual < CPC.Cantidad
)
)
BEGIN
RAISERROR('Productos inactivos o sin inventario.',16,1)
ROLLBACK
RETURN
END

------------------------------------------------
-- 3 Calcular subtotal aplicando descuento
------------------------------------------------

SELECT @Subtotal =
SUM(
    (P.Precio * (1 - ISNULL(P.Descuento,0)/100))
    * CPC.Cantidad
)
FROM ECOEMPRESARIAS_PRODUCTOS_POR_CARRITO_TB CPC
JOIN ECOEMPRESARIAS_PRODUCTO_TB P
ON CPC.Producto_id = P.Producto_id
WHERE CPC.Carrito_id = @Carrito_id

SET @IVA = @Subtotal * 0.13
SET @Total = @Subtotal + @IVA

------------------------------------------------
-- 4 Crear factura
------------------------------------------------

INSERT INTO ECOEMPRESARIAS_FACTURAS_TB
(
Fecha,
Subtotal,
IVA,
Total,
Estado_id,
Usuario_id,
Emprendimiento_id
)
VALUES
(
GETDATE(),
@Subtotal,
@IVA,
@Total,
1,
@Usuario_id,
@Emprendimiento_id
)

SET @Factura_id = SCOPE_IDENTITY()

------------------------------------------------
-- 5 Insertar detalle factura
------------------------------------------------

INSERT INTO ECOEMPRESARIAS_DETALLE_FACTURAS_TB
(
Factura_id,
Producto_id,
Cantidad,
PrecioUnitario,
Subtotal,
Estado_id
)
SELECT
@Factura_id,
P.Producto_id,
CPC.Cantidad,
P.Precio * (1 - ISNULL(P.Descuento,0)/100),
(CPC.Cantidad * (P.Precio * (1 - ISNULL(P.Descuento,0)/100))),
1
FROM ECOEMPRESARIAS_PRODUCTOS_POR_CARRITO_TB CPC
JOIN ECOEMPRESARIAS_PRODUCTO_TB P
ON CPC.Producto_id = P.Producto_id
WHERE CPC.Carrito_id = @Carrito_id

------------------------------------------------
-- 6 Descontar inventario
------------------------------------------------

UPDATE I
SET I.Cantidad_actual = I.Cantidad_actual - CPC.Cantidad
FROM ECOEMPRESARIAS_INVENTARIO_TB I
JOIN ECOEMPRESARIAS_PRODUCTOS_POR_CARRITO_TB CPC
ON I.Producto_id = CPC.Producto_id
WHERE CPC.Carrito_id = @Carrito_id

------------------------------------------------
-- 7 Crear pedido
------------------------------------------------

INSERT INTO ECOEMPRESARIAS_PEDIDOS_TB
(
Pedido_id,
Factura_id,
Usuario_id,
Emprendimiento_id,
FechaPedido,
Estado_id,
DireccionEntrega,
Observaciones
)
VALUES
(
@Pedido_id,
@Factura_id,
@Usuario_id,
@Emprendimiento_id,
GETDATE(),
5,
@DireccionEntrega,
@Observaciones
)

------------------------------------------------
-- 8 Vaciar carrito
------------------------------------------------

DELETE
FROM ECOEMPRESARIAS_PRODUCTOS_POR_CARRITO_TB
WHERE Carrito_id = @Carrito_id

COMMIT

SELECT @Pedido_id AS Pedido_id

END TRY
BEGIN CATCH

ROLLBACK

END CATCH

END