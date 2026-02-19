import { Card, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type {
  Emprendedor,
  TipoActividad,
} from "../../../../types/emprendedoresType";

interface EmprendimientoCardProps {
  emprendedor: Emprendedor;
  tiposActividad: TipoActividad[];
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

export function EmprendimientoCard({
  emprendedor,
  tiposActividad,
}: EmprendimientoCardProps) {
  const tipoActividad = tiposActividad.find(
    (t) => t.tipoActividadId === emprendedor.tipoActividadId,
  );
  
  return (
    
      <Card  className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <Link to={`/emprendimiento/${emprendedor.emprendimientoId}/${emprendedor.cedulaJuridica}`} className="block w-full h-full">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {emprendedor.ruta_Imagen_Logo ? (
            <img
              src={`https://localhost:7050/api/Images/Buscar/1/${emprendedor.ruta_Imagen_Logo}`}
              alt={emprendedor.nombre}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-[#0066aa]/10 to-[#004d7a]/20">
              <span className="text-5xl font-bold text-[#0066aa]/30">
                {emprendedor.nombre.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          {tipoActividad && (
            <Badge className="absolute top-3 left-3 bg-[#0066aa] hover:bg-[#005599] text-white text-xs">
              {tipoActividad.nombre}
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground text-base leading-tight mb-1 group-hover:text-[#0066aa] transition-colors">
            {emprendedor.nombre}
          </h3>
          {emprendedor.descripcion && (
            <p className="text-muted-foreground text-sm mb-2 leading-snug">
              {truncateText(emprendedor.descripcion, 30)}
            </p>
          )}
          {emprendedor.direccion && (
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span>{truncateText(emprendedor.direccion, 30)}</span>
            </div>
          )}
        </CardContent>
        </Link>
      </Card>
    
  );
}
