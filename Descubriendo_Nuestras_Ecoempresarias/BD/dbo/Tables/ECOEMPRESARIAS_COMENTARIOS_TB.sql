CREATE TABLE [dbo].[ECOEMPRESARIAS_COMENTARIOS_TB] ( 
    [Comentario_id] INT IDENTITY(1,1) NOT NULL,
    [Comentario]    VARCHAR(1000) NOT NULL,
    [Fecha]         DATE NOT NULL DEFAULT GETDATE(),
    [Calificacion]  DECIMAL(3,2) NOT NULL,
    [Emprendimiento_id] INT NOT NULL,
    [Usuario_id]    INT NOT NULL,
    [Estado_id]     INT NOT NULL,

    CONSTRAINT [ECO_COMENTARIO_PK] 
        PRIMARY KEY CLUSTERED ([Comentario_id] ASC),

    CONSTRAINT [ECO_COMENTARIO_EMPRENDIMIENTO_FK] 
        FOREIGN KEY ([Emprendimiento_id]) 
        REFERENCES [dbo].[ECOEMPRESARIAS_EMPRENDIMIENTOS_TB] ([Emprendimiento_id]),

    CONSTRAINT [ECO_COMENTARIO_ESTADO_FK] 
        FOREIGN KEY ([Estado_id]) 
        REFERENCES [dbo].[ECOEMPRESARIAS_ESTADOS_TB] ([Estado_id]),

    CONSTRAINT [ECO_COMENTARIO_USUARIO_FK] 
        FOREIGN KEY ([Usuario_id]) 
        REFERENCES [dbo].[ECOEMPRESARIAS_USUARIOS_TB] ([Usuario_id])
);

