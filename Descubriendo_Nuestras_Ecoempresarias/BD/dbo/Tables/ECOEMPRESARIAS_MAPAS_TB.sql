CREATE TABLE [dbo].[ECOEMPRESARIAS_MAPAS_TB] (
    [Mapa_id]   INT             IDENTITY (1, 1) NOT NULL,
    [Nombre]    NVARCHAR (150)  NOT NULL,
    [Alto]      INT             NOT NULL,
    [Ancho]     INT             NOT NULL,
    [Escala]    DECIMAL (10, 2) NULL,
    [Estado_id] INT             NOT NULL,
    CONSTRAINT [PK_ECOEMPRESARIAS_MAPAS_TB] PRIMARY KEY CLUSTERED ([Mapa_id] ASC),
    CONSTRAINT [ECO_MAPAS_ESTADO_FK] FOREIGN KEY ([Estado_id]) REFERENCES [dbo].[ECOEMPRESARIAS_ESTADOS_TB] ([Estado_id])
);

