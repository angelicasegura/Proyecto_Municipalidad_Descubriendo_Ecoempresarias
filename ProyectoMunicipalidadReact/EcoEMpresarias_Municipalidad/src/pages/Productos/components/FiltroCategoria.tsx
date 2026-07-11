import type { Categoria } from '../../../types/categoriaType';

interface FiltroCategoriaProps {
    categorias: Categoria[]
    categoriaSeleccionada: string
    onChange: (categoriaId: string) => void
}

export function FiltroCategoria({
    categorias,
    categoriaSeleccionada,
    onChange,
}: FiltroCategoriaProps) {
    return (
        <select
            value={categoriaSeleccionada}
            onChange={(e) => onChange(e.target.value)}
            className="w-full sm:w-56 rounded-xl border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
            <option value="">Todas las categorías</option>
            {categorias.map((cat) => (
                <option key={cat.Categoria_id} value={cat.Categoria_id}>
                    {cat.Nombre}
                </option>
            ))}
        </select>
    )
}