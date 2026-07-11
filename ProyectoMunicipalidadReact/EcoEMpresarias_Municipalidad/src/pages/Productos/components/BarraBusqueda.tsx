import { Search } from "lucide-react"

interface BarraBusquedaProps {
    valor: string
    onChange: (valor: string) => void
}

export function BarraBusqueda({ valor, onChange }: BarraBusquedaProps) {
    return (
        <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
                type="text"
                placeholder="Buscar producto por nombre..."
                value={valor}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-4 py-3.5 text-base shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40"
            />
        </div>
    )
}