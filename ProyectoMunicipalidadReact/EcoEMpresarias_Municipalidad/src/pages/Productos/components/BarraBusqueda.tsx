interface BarraBusquedaProps {
    valor: string
    onChange: (valor: string) => void
}

export function BarraBusqueda({ valor, onChange }: BarraBusquedaProps) {
    return (
        <input
            type="text"
            placeholder="Buscar producto por nombre..."
            value={valor}
            onChange={(e) => onChange(e.target.value)}
            className="barra-busqueda"
        />
    )
}