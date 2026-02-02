CREATE TABLE [dbo].[ECOEMPRESARIAS_USUARIOS_TB] (
    [Usuario_id]         INT           NOT NULL,
    [Nombre]             VARCHAR (200) NOT NULL,
    [Apellidos]          VARCHAR (200) NOT NULL,
    [Telefono]           VARCHAR (15)  NOT NULL,
    [Contrasena]         VARCHAR (200) NOT NULL,
    [Email]              VARCHAR (200) NOT NULL,
    [Ruta_Imagen_Perfil] VARCHAR (300) NOT NULL,
    [Edad]               INT           NOT NULL,
    [Estado_id]          INT           NOT NULL,
    [Rol_id]             INT           NOT NULL,
    CONSTRAINT [ECO_USUARIOS_PK] PRIMARY KEY CLUSTERED ([Usuario_id] ASC),
    CONSTRAINT [ECO_EDAD_USUARIO_CHK] CHECK ([Edad]>(0)),
    CONSTRAINT [ECO_USUARIOS_ESTADO_FK] FOREIGN KEY ([Estado_id]) REFERENCES [dbo].[ECOEMPRESARIAS_ESTADOS_TB] ([Estado_id]),
    CONSTRAINT [ECO_USUARIOS_ROL_FK] FOREIGN KEY ([Rol_id]) REFERENCES [dbo].[ECOEMPRESARIAS_ROLES_TB] ([Rol_id]),
    CONSTRAINT [ECO_EMAIL_USUARIO_UNQ] UNIQUE NONCLUSTERED ([Email] ASC)
);

