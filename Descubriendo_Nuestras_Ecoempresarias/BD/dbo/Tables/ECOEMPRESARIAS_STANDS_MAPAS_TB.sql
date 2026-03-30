CREATE TABLE [dbo].[ECOEMPRESARIAS_STANDS_MAPAS_TB] (
    [Stand_id]  INT           IDENTITY (1, 1) NOT NULL,
    [Codigo]    NVARCHAR (50) NOT NULL,
    [X]         INT           NOT NULL,
    [Y]         INT           NOT NULL,
    [Ancho]     INT           NOT NULL,
    [Alto]      INT           NOT NULL,
    [Rotacion]  INT           NULL,
    [Mapa_id]   INT           NOT NULL,
    [Estado_id] INT           NOT NULL,
    CONSTRAINT [PK_ECOEMPRESARIAS_STANDS_MAPAS_TB] PRIMARY KEY CLUSTERED ([Stand_id] ASC),
    CONSTRAINT [ECO_STAND_ESTADO_FK] FOREIGN KEY ([Estado_id]) REFERENCES [dbo].[ECOEMPRESARIAS_ESTADOS_TB] ([Estado_id]),
    CONSTRAINT [FK_ECOEMPRESARIAS_STANDS_MAPA] FOREIGN KEY ([Mapa_id]) REFERENCES [dbo].[ECOEMPRESARIAS_MAPAS_TB] ([Mapa_id])
);

