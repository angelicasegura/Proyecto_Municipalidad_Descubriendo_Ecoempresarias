import type { Emprendedor } from "../../../../types/emprendedoresType";
import { Card, CardContent } from "../../../../components/ui/card";

import { Skeleton } from "../../../../components/ui/skeleton";
import { Separator } from "../../../../components/ui/separator";

import { MapPin, Mail, Phone } from "lucide-react";

interface Props {
  emprendedor: Emprendedor | null;
  loading: boolean;
}

export default function EmprendimientoHeader({ emprendedor, loading }: Props) {
  if (loading) {
    return (
      <Card className="overflow-hidden rounded-2xl border-0 shadow-md">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <Skeleton className="h-40 w-40 shrink-0 rounded-2xl md:h-48 md:w-48" />
            <div className="flex w-full flex-col gap-3 text-center md:text-left">
              <Skeleton className="mx-auto h-8 w-64 md:mx-0" />
              <Skeleton className="mx-auto h-5 w-40 md:mx-0" />
              <Skeleton className="mx-auto h-4 w-full max-w-md md:mx-0" />
              <Skeleton className="mx-auto h-4 w-full max-w-sm md:mx-0" />
              <div className="flex flex-col gap-2 pt-2">
                <Skeleton className="mx-auto h-4 w-48 md:mx-0" />
                <Skeleton className="mx-auto h-4 w-44 md:mx-0" />
                <Skeleton className="mx-auto h-4 w-36 md:mx-0" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!emprendedor) return null;

 
  const isActivo = emprendedor.estadoId === 1;

  return (
    <Card className="overflow-hidden rounded-2xl border-0 shadow-md transition-shadow hover:shadow-lg">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
          {/* Logo */}
          <div className="shrink-0 overflow-hidden rounded-2xl">
            <img
              src={`https://localhost:7050/api/Images/Buscar/1/${emprendedor.ruta_Imagen_Logo}`}
              alt={emprendedor.nombre}
              className="h-40 w-40 object-cover md:h-48 md:w-48"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-3 text-center md:text-left">
            <div className="flex flex-col items-center gap-2 md:flex-row">
              <h1 className="text-2xl font-bold text-emprendimiento-text md:text-3xl">
                {emprendedor.nombre}
              </h1>
            </div>

            

            {emprendedor.descripcion && (
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                {emprendedor.descripcion}
              </p>
            )}

            <Separator className="my-1" />

            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <MapPin className="h-4 w-4 shrink-0 text-emprendimiento-primary" />
                <span>{emprendedor.direccion}</span>
              </div>
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Mail className="h-4 w-4 shrink-0 text-emprendimiento-primary" />
                <span>{emprendedor.email}</span>
              </div>
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Phone className="h-4 w-4 shrink-0 text-emprendimiento-primary" />
                <span>{emprendedor.telefono}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}