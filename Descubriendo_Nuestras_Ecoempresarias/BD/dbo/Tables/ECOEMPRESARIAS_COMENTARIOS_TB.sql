CREATE TABLE [dbo].[ECOEMPRESARIAS_COMENTARIOS_TB] (
    [Comentario_id] INT            NOT NULL,
    [Comentario]    VARCHAR (1000) NOT NULL,
    [Fecha]         DATE           NOT NULL,
    [Calificacion]  FLOAT (53)     NOT NULL,
    [Usuario_id]    INT            NOT NULL,
    [Estado_id]     INT            NOT NULL,
    CONSTRAINT [ECO_COMENTARIO_PK] PRIMARY KEY CLUSTERED ([Comentario_id] ASC),
    CONSTRAINT [ECO_COMENTARIO_ESTADO_FK] FOREIGN KEY ([Estado_id]) REFERENCES [dbo].[ECOEMPRESARIAS_ESTADOS_TB] ([Estado_id]),
    CONSTRAINT [ECO_COMENTARIO_USUARIO_FK] FOREIGN KEY ([Usuario_id]) REFERENCES [dbo].[ECOEMPRESARIAS_USUARIOS_TB] ([Usuario_id])
);

