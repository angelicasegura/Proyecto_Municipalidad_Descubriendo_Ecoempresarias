import type { CategoriaProducto } from "../../../../types/productosType";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Search } from "lucide-react";

interface Props {
  busqueda: string;
  setBusqueda: (v: string) => void;
  categoriaSeleccionada: string;
  setCategoriaSeleccionada: (v: string) => void;
  categorias: CategoriaProducto[];
  onLimpiar: () => void;
}

export default function ProductosFilters({
  busqueda,
  setBusqueda,
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  categorias,
}: Props) {
 
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-card p-4 shadow-sm md:flex-row md:items-center md:gap-4">
      {/* Búsqueda */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="rounded-xl border-0 bg-muted pl-10"
        />
      </div>

      {/* Categoría */}
      <div className="sm:w-56">
      <Select
  value={categoriaSeleccionada}
  onValueChange={setCategoriaSeleccionada}
>
  <SelectTrigger className="h-11 w-full md:w-52 bg-card border-border min-w-0">
    <SelectValue placeholder="Todas las categorías" className="truncate"/>
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="all">Todas las categorías</SelectItem>

    {categorias.map((cat) => (
      <SelectItem
        key={cat.categoria_Id}
        value={String(cat.categoria_Id)}  
      >
        {cat.nombre}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
</div>
      
    </div>
  );
}