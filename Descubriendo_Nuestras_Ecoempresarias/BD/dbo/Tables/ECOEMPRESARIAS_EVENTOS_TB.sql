CREATE TABLE [dbo].[ECOEMPRESARIAS_EVENTOS_TB] (
    [Evento_id]      INT           IDENTITY (1, 1) NOT NULL,
    [NombreEvento]   VARCHAR (200) NOT NULL,
    [Descripcion]    VARCHAR (500) NOT NULL,
    [Fecha_inicio]   DATE          NOT NULL,
    [Fecha_final]    DATE          NOT NULL,
    [Horario]        TIME (7)      NOT NULL,
    [Cupos]          INT           NOT NULL,
    [Cupos_actuales] INT           NOT NULL,
    [Lugar_id]       INT           NOT NULL,
    [Estado_id]      INT           NOT NULL,
    CONSTRAINT [ECO_EVENTOS_PK] PRIMARY KEY CLUSTERED ([Evento_id] ASC),
    CONSTRAINT [ECO_EVENTOS_CUPOS_ACTUALES_CHK] CHECK ([Cupos_actuales]>=(0)),
    CONSTRAINT [ECO_EVENTOS_CUPOS_CHK] CHECK ([Cupos]>=(0)),
    CONSTRAINT [ECO_EVENTOS_ESTADO_FK] FOREIGN KEY ([Estado_id]) REFERENCES [dbo].[ECOEMPRESARIAS_ESTADOS_TB] ([Estado_id]),
    CONSTRAINT [ECO_EVENTOS_LUGAR_FK] FOREIGN KEY ([Lugar_id]) REFERENCES [dbo].[ECOEMPRESARIAS_LUGARES_TB] ([Lugar_id])
);

