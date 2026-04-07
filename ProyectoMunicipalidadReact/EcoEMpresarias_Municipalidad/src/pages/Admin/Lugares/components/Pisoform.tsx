import { useState, useEffect } from "react"
import  type{ PisoRequest, PisoResponse } from "../../../../types/lugarType"

interface Props {
    lugarId: number
    pisoEditar?: PisoResponse | null
    onGuardar: (piso: PisoRequest, id?: number) => Promise<void>
    onCancelar: () => void
}

export default function PisoForm({ lugarId, pisoEditar, onGuardar, onCancelar }: Props) {

    const [nombre, setNombre] = useState("")
    const [numero, setNumero] = useState(1)
    const [guardando, setGuardando] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (pisoEditar) {
            setNombre(pisoEditar.nombre_Piso)
            setNumero(pisoEditar.numero_Piso)
        } else {
            setNombre("")
            setNumero(1)
        }
        setError("")
    }, [pisoEditar])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!nombre.trim()) { setError("El nombre es requerido"); return }

        setGuardando(true)
        try {
            await onGuardar(
                { Nombre_Piso: nombre, Numero_Piso: numero, Lugar_id: lugarId, Estado_id: 1 },
                pisoEditar?.piso_id
            )
        } finally {
            setGuardando(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-24 z-50 overflow-y-auto">
            <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">

                <h2 className="text-lg font-bold mb-4">
                    {pisoEditar ? "Editar Piso" : "Agregar Piso"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">

                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre del piso</label>
                        <input
                            value={nombre}
                            onChange={e => { setNombre(e.target.value); setError("") }}
                            className={`w-full border p-2 rounded ${error ? "border-red-500" : ""}`}
                            placeholder="Ej: Planta Baja"
                        />
                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Número de piso</label>
                        <input
                            type="number"
                            value={numero}
                            onChange={e => setNumero(Number(e.target.value))}
                            min={0}
                            className="w-full border p-2 rounded"
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
                            {guardando ? "Guardando..." : pisoEditar ? "Actualizar" : "Agregar"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}