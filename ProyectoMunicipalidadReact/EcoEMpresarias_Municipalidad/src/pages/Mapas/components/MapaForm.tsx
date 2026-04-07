import { useState, useEffect } from "react"
import { type MapaResponse, type MapaRequest, ESTADO_ACTIVO } from "../../../types/mapaType"

interface Props {
    mapaEditar?: MapaResponse | null
    onGuardar: (mapa: MapaRequest, id?: number) => Promise<void>
    onCancelar: () => void
}

const formVacio: MapaRequest = {
    Nombre: "",
    Alto: 600,
    Ancho: 900,
    Escala: 1,
    Estado_id: ESTADO_ACTIVO,
}

export default function MapaForm({ mapaEditar, onGuardar, onCancelar }: Props) {

    const [form, setForm] = useState<MapaRequest>(formVacio)
    const [guardando, setGuardando] = useState(false)
    const [errores, setErrores] = useState<Partial<Record<keyof MapaRequest, string>>>({})

    useEffect(() => {
        if (mapaEditar) {
            // Mapear camelCase del response → PascalCase del request
            setForm({
                Nombre: mapaEditar.nombre,
                Alto: mapaEditar.alto,
                Ancho: mapaEditar.ancho,
                Escala: mapaEditar.escala,
                Estado_id: mapaEditar.estadoNombre === "ACTIVO" ? 1 : 0,
            })
        } else {
            setForm(formVacio)
        }
        setErrores({})
    }, [mapaEditar])

    const validar = (): boolean => {
        const e: Partial<Record<keyof MapaRequest, string>> = {}
        if (!form.Nombre.trim()) e.Nombre = "El nombre es requerido"
        if (form.Alto <= 0) e.Alto = "Debe ser mayor a 0"
        if (form.Ancho <= 0) e.Ancho = "Debe ser mayor a 0"
        if (form.Escala <= 0) e.Escala = "Debe ser mayor a 0"
        setErrores(e)
        return Object.keys(e).length === 0
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target
        setForm(prev => ({ ...prev, [name]: type === "number" ? parseFloat(value) || 0 : value }))
        setErrores(prev => ({ ...prev, [name]: undefined }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validar()) return
        setGuardando(true)
        try {
            await onGuardar(form, mapaEditar?.mapa_id)
            if (!mapaEditar) setForm(formVacio)
        } finally {
            setGuardando(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-20 overflow-y-auto z-50">
            <div className="bg-white p-6 rounded-lg w-[480px] shadow-lg max-h-[90vh] overflow-y-auto">

                <h2 className="text-xl font-bold mb-4">
                    {mapaEditar ? "Editar Mapa" : "Crear Mapa"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">

                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre del mapa</label>
                        <input
                            name="Nombre"
                            value={form.Nombre}
                            onChange={handleChange}
                            className={`w-full border p-2 rounded ${errores.Nombre ? "border-red-500" : ""}`}
                            placeholder="Ej: Mapa Feria Central 2025"
                        />
                        {errores.Nombre && <p className="text-red-500 text-xs mt-1">{errores.Nombre}</p>}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">Ancho (px)</label>
                            <input
                                name="Ancho"
                                type="number"
                                value={form.Ancho}
                                onChange={handleChange}
                                min={1}
                                className={`w-full border p-2 rounded ${errores.Ancho ? "border-red-500" : ""}`}
                            />
                            {errores.Ancho && <p className="text-red-500 text-xs mt-1">{errores.Ancho}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Alto (px)</label>
                            <input
                                name="Alto"
                                type="number"
                                value={form.Alto}
                                onChange={handleChange}
                                min={1}
                                className={`w-full border p-2 rounded ${errores.Alto ? "border-red-500" : ""}`}
                            />
                            {errores.Alto && <p className="text-red-500 text-xs mt-1">{errores.Alto}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Escala</label>
                            <input
                                name="Escala"
                                type="number"
                                value={form.Escala}
                                onChange={handleChange}
                                step="0.1"
                                min={0.1}
                                className={`w-full border p-2 rounded ${errores.Escala ? "border-red-500" : ""}`}
                            />
                            {errores.Escala && <p className="text-red-500 text-xs mt-1">{errores.Escala}</p>}
                        </div>
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
                            {guardando ? "Guardando..." : mapaEditar ? "Actualizar" : "Crear Mapa"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
