import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, X } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { Calendar } from "../../../../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import { cn } from "../../../../../lib/utils";

interface FiltroPedidosProps {
  estadoFiltro: string;
  onEstadoChange: (val: string) => void;
  fechaFiltro: Date | undefined;
  onFechaChange: (val: Date | undefined) => void;
}

const FiltroPedidos = ({
  estadoFiltro,
  onEstadoChange,
  fechaFiltro,
  onFechaChange,
}: FiltroPedidosProps) => {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Select value={estadoFiltro} onValueChange={onEstadoChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Todos los estados" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="5">Pendiente</SelectItem>
          <SelectItem value="6">En Proceso</SelectItem>
          <SelectItem value="7">Finalizado</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[200px] justify-start text-left font-normal",
              !fechaFiltro && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            {fechaFiltro ? format(fechaFiltro, "PPP", { locale: es }) : "Filtrar por fecha"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={fechaFiltro}
            onSelect={onFechaChange}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>

      {(estadoFiltro !== "all" || fechaFiltro) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onEstadoChange("all");
            onFechaChange(undefined);
          }}
        >
          <X className="h-4 w-4 mr-1" />
          Limpiar
        </Button>
      )}
    </div>
  );
};

export default FiltroPedidos;