CREATE TABLE [dbo].[ECOEMPRESARIAS_PEDIDOS_TB] (
    [Pedido_id]         UNIQUEIDENTIFIER NOT NULL,
    [Factura_id]        INT              NOT NULL,
    [Usuario_id]        INT              NOT NULL,
    [Emprendimiento_id] INT              NOT NULL,
    [FechaPedido]       DATETIME         CONSTRAINT [ECO_PEDIDOS_FECHA_DF] DEFAULT (getdate()) NOT NULL,
    [Estado_id]         INT              NOT NULL,
    CONSTRAINT [ECO_PEDIDOS_PK] PRIMARY KEY CLUSTERED ([Pedido_id] ASC),
    CONSTRAINT [ECO_PEDIDOS_EMPRENDIMIENTO_FK] FOREIGN KEY ([Emprendimiento_id]) REFERENCES [dbo].[ECOEMPRESARIAS_EMPRENDIMIENTOS_TB] ([Emprendimiento_id]),
    CONSTRAINT [ECO_PEDIDOS_ESTADO_FK] FOREIGN KEY ([Estado_id]) REFERENCES [dbo].[ECOEMPRESARIAS_ESTADOS_TB] ([Estado_id]),
    CONSTRAINT [ECO_PEDIDOS_FACTURA_FK] FOREIGN KEY ([Factura_id]) REFERENCES [dbo].[ECOEMPRESARIAS_FACTURAS_TB] ([Factura_id]),
    CONSTRAINT [ECO_PEDIDOS_USUARIO_FK] FOREIGN KEY ([Usuario_id]) REFERENCES [dbo].[ECOEMPRESARIAS_USUARIOS_TB] ([Usuario_id]),
    UNIQUE NONCLUSTERED ([Factura_id] ASC)
);

