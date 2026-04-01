CREATE   PROCEDURE [dbo].[sp_ObtenerPedidosPorUsuario]
(
    @Usuario_id INT,
    @Estado_id INT = NULL,           -- filtrar por estado opcional
    @Pagina INT = 1,
	@Fecha DATE = NULL,
    @RegistrosPorPagina INT = 10
)
AS
BEGIN
    SET NOCOUNT ON;

    -----------------------------------------
    -- 1. PEDIDOS CON PAGINACION
    -----------------------------------------
    ;WITH PedidosCTE AS
    (
        SELECT 
            P.Pedido_id,
            P.FechaPedido,
            P.Estado_id,
            P.DireccionEntrega,
            P.Observaciones,
            P.Factura_id,
            ROW_NUMBER() OVER (ORDER BY P.FechaPedido DESC) AS RowNum
        FROM dbo.ECOEMPRESARIAS_PEDIDOS_TB P
        WHERE P.Usuario_id = @Usuario_id
          AND (
                (@Estado_id IS NOT NULL AND P.Estado_id = @Estado_id)
                OR (@Estado_id IS NULL AND P.Estado_id IN (5,6))
              )
          AND (@Fecha IS NULL OR CAST(P.FechaPedido AS DATE) = @Fecha)
    )
    SELECT *
    FROM PedidosCTE
    WHERE RowNum BETWEEN ((@Pagina - 1) * @RegistrosPorPagina + 1)
                     AND (@Pagina * @RegistrosPorPagina);

    -----------------------------------------
    -- 2. FACTURAS DEL USUARIO
    -----------------------------------------
    SELECT 
        F.Factura_id,
        F.Fecha,
        F.Subtotal,
        F.IVA,
        F.Total,
        F.Usuario_id,
        F.Emprendimiento_id,
        F.Estado_id
    FROM dbo.ECOEMPRESARIAS_FACTURAS_TB F
    INNER JOIN dbo.ECOEMPRESARIAS_PEDIDOS_TB P
        ON P.Factura_id = F.Factura_id
    WHERE P.Usuario_id = @Usuario_id
      AND (
            (@Estado_id IS NOT NULL AND P.Estado_id = @Estado_id)
            OR (@Estado_id IS NULL AND P.Estado_id IN (5,6))
          )
      AND (@Fecha IS NULL OR CAST(P.FechaPedido AS DATE) = @Fecha);

    -----------------------------------------
    -- 3. DETALLE DE FACTURAS
    -----------------------------------------
    SELECT 
        DF.Factura_id,
        DF.Producto_id,
        P.NombreProducto,
        DF.Cantidad,
        DF.PrecioUnitario,
        DF.Subtotal
    FROM dbo.ECOEMPRESARIAS_DETALLE_FACTURAS_TB DF
    INNER JOIN dbo.ECOEMPRESARIAS_PRODUCTO_TB P
        ON DF.Producto_id = P.Producto_id
    INNER JOIN dbo.ECOEMPRESARIAS_PEDIDOS_TB PED
        ON DF.Factura_id = PED.Factura_id
    WHERE PED.Usuario_id = @Usuario_id
      AND (
            (@Estado_id IS NOT NULL AND PED.Estado_id = @Estado_id)
            OR (@Estado_id IS NULL AND PED.Estado_id IN (5,6))
          )
      AND (@Fecha IS NULL OR CAST(PED.FechaPedido AS DATE) = @Fecha)
    ORDER BY DF.Factura_id;

END