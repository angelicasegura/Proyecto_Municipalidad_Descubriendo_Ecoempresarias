CREATE TABLE [dbo].[ECOEMPRESARIAS_EVENTOS_TB] (
    [Evento_id]    INT           NOT NULL,
    [NombreEvento] VARCHAR (200) NOT NULL,
    [Descripcion]  VARCHAR (500) NOT NULL,
    [Fecha]        DATE          NOT NULL,
    [Horario]      TIME (7)      NOT NULL,
    [Lugar]        VARCHAR (300) NOT NULL,
    [Cupos]        INT           NOT NULL,
    [Estado_id]    INT           NOT NULL,
    CONSTRAINT [ECO_EVENTOS_PK] PRIMARY KEY CLUSTERED ([Evento_id] ASC),
    CONSTRAINT [ECO_EVENTOS_CUPOS_CHK] CHECK ([Cupos]>=(0)),
    CONSTRAINT [ECO_EVENTOS_ESTADO_FK] FOREIGN KEY ([Estado_id]) REFERENCES [dbo].[ECOEMPRESARIAS_ESTADOS_TB] ([Estado_id])
);

