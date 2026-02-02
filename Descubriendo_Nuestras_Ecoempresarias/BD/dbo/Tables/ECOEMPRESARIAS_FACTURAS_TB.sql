CREATE TABLE [dbo].[ECOEMPRESARIAS_FACTURAS_TB] (
    [Factura_id]        INT             NOT NULL,
    [Fecha]             DATE            NOT NULL,
    [Total]             DECIMAL (10, 2) NOT NULL,
    [IVA]               DECIMAL (10, 2) NOT NULL,
    [Descuento]         DECIMAL (10, 2) NOT NULL,
    [Estado_id]         INT             NOT NULL,
    [Usuario_id]        INT             NOT NULL,
    [Emprendimiento_id] INT             NOT NULL,
    CONSTRAINT [ECO_FACTURAS_PK] PRIMARY KEY CLUSTERED ([Factura_id] ASC),
    CONSTRAINT [ECO_FACTURAS_DESC_CHK] CHECK ([Descuento]>=(0)),
    CONSTRAINT [ECO_FACTURAS_IVA_CHK] CHECK ([IVA]>=(0)),
    CONSTRAINT [ECO_FACTURAS_TOTAL_CHK] CHECK ([Total]>=(0)),
    CONSTRAINT [ECO_FACTURAS_EMPRENDIMIENTO_FK] FOREIGN KEY ([Emprendimiento_id]) REFERENCES [dbo].[ECOEMPRESARIAS_EMPRENDIMIENTOS_TB] ([Emprendimiento_id]),
    CONSTRAINT [ECO_FACTURAS_ESTADO_FK] FOREIGN KEY ([Estado_id]) REFERENCES [dbo].[ECOEMPRESARIAS_ESTADOS_TB] ([Estado_id]),
    CONSTRAINT [ECO_FACTURAS_USUARIO_FK] FOREIGN KEY ([Usuario_id]) REFERENCES [dbo].[ECOEMPRESARIAS_USUARIOS_TB] ([Usuario_id])
);

