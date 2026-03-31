CREATE TABLE [dbo].[ECOEMPRESARIAS_RESERVA_EVENTOS_TB] (
    [Reserva_id]           INT            IDENTITY (1, 1) NOT NULL,
    [Evento_id]            INT            NOT NULL,
    [Emprendimiento_id]    INT            NOT NULL,
    [Nombre]               NVARCHAR (100) NULL,
    [Apellidos]            NVARCHAR (100) NULL,
    [Cedula]               NVARCHAR (50)  NULL,
    [NombreEmprendimiento] NVARCHAR (200) NULL,
    [Productos]            NVARCHAR (500) NULL,
    [Correo]               NVARCHAR (200) NULL,
    [Estado_id]            INT            NULL,
    [Fecha_solicitud]      DATETIME       DEFAULT (getdate()) NULL,
    PRIMARY KEY CLUSTERED ([Reserva_id] ASC),
    FOREIGN KEY ([Emprendimiento_id]) REFERENCES [dbo].[ECOEMPRESARIAS_EMPRENDIMIENTOS_TB] ([Emprendimiento_id]),
    FOREIGN KEY ([Estado_id]) REFERENCES [dbo].[ECOEMPRESARIAS_ESTADOS_TB] ([Estado_id]),
    FOREIGN KEY ([Evento_id]) REFERENCES [dbo].[ECOEMPRESARIAS_EVENTOS_TB] ([Evento_id])
);

