CREATE TABLE [dbo].[ECOEMPRESARIAS_TIPO_ACTIVIDAD_TB] (
    [TipoActividad_id] INT           IDENTITY (1, 1) NOT NULL,
    [Nombre]           VARCHAR (100) NOT NULL,
    [Descripcion]      VARCHAR (500) NULL,
    [Estado_id]        INT           DEFAULT ((1)) NOT NULL,
    CONSTRAINT [PK_ECOEMPRESARIAS_TIPO_ACTIVIDAD_TB] PRIMARY KEY CLUSTERED ([TipoActividad_id] ASC)
);

