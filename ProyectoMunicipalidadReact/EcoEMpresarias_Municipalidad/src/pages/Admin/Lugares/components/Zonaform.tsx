import { useState, useEffect } from "react"
import type { ZonaRequest, ZonaResponse } from "../../../../types/lugarType"

interface Props {
    pisoId: number
    zonaEditar?: ZonaResponse | null
    onGuardar: (zona: ZonaRequest, id?: number) => Promise<void>
    onCancelar: () => void
}


export default function ZonaForm({ pisoId, zonaEditar, onGuardar, onCancelar }: Props) {

    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [guardando, setGuardando] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (zonaEditar) {
            setNombre(zonaEditar.nombre)
            setDescripcion(zonaEditar.descripcion)
        } else {
            setNombre("")
            setDescripcion("")
        }
        setError("")
    }, [zonaEditar])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!nombre.trim()) { setError("El nombre es requerido"); return }

        setGuardando(true)
        try {
            await onGuardar(
                {
                    Nombre: nombre,
                    Descripcion: descripcion,
                    Piso_id: pisoId,
                    Mapa_id: null,
                    Estado_id: 1,
                },
                zonaEditar?.zona_id
            )
        } finally {
            setGuardando(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-24 z-50 overflow-y-auto">
            <div className="bg-white p-6 rounded-lg w-[420px] shadow-lg">

                <h2 className="text-lg font-bold mb-4">
                    {zonaEditar ? "Editar Zona" : "Agregar Zona"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">

                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre de la zona</label>
                        <input
                            value={nombre}
                            onChange={e => { setNombre(e.target.value); setError("") }}
                            className={`w-full border p-2 rounded ${error ? "border-red-500" : ""}`}
                            placeholder="Ej: Zona Norte"
                        />
                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Descripción</label>
                        <textarea
                            value={descripcion}
                            onChange={e => setDescripcion(e.target.value)}
                            className="w-full border p-2 rounded resize-none"
                            rows={3}
                            placeholder="Descripción opcional de la zona..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onCancelar}
                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={guardando}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
                        >
                            {guardando ? "Guardando..." : zonaEditar ? "Actualizar" : "Agregar"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}