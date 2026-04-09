import { useState, useEffect } from "react"
import type { EditorTool, StandResponse } from "../../../types/mapaType"
import { MousePointer2, PlusSquare, Save, Trash2 } from "lucide-react"

interface Props {
    tool: EditorTool
    onToolChange: (tool: EditorTool) => void
    standSeleccionado: StandResponse | null
    onActualizarStand: (id: number, datos: Partial<StandResponse>) => void
    onEliminarStand: (id: number) => void
    onGuardarCambios: () => void
    guardando: boolean
    hayPendientes: boolean
}

export default function StandToolbar({
    tool,
    onToolChange,
    standSeleccionado,
    onActualizarStand,
    onEliminarStand,
    onGuardarCambios,
    guardando,
    hayPendientes,
}: Props) {

    const [form, setForm] = useState({
        codigo: "", x: 0, y: 0, ancho: 80, alto: 60, rotacion: 0,
    })

    useEffect(() => {
        if (standSeleccionado) {
            setForm({
                codigo: standSeleccionado.codigo,
                x: standSeleccionado.x,
                y: standSeleccionado.y,
                ancho: standSeleccionado.ancho,
                alto: standSeleccionado.alto,
                rotacion: standSeleccionado.rotacion,
            })
        }
    }, [standSeleccionado?.stand_id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target
        const parsed = type === "number" ? parseInt(value) || 0 : value
        setForm(prev => ({ ...prev, [name]: parsed }))
        if (standSeleccionado) {
            onActualizarStand(standSeleccionado.stand_id, { [name]: parsed })
        }
    }

    // Badge de estado basado en estado_id numérico (1 = Activo, 0 = Inactivo)
    const esActivo = standSeleccionado?.estado_id === 1

    return (
        <aside className="w-56 min-w-[224px] bg-white border-l flex flex-col overflow-y-auto">

            {/* Herramientas */}
            <div className="p-4 border-b">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Herramientas
                </p>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => onToolChange("select")}
                        className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition
              ${tool === "select"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                    >
                        <MousePointer2 size={15} />
                        Seleccionar
                    </button>
                    <button
                        onClick={() => onToolChange("add")}
                        className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition
              ${tool === "add"
                                ? "bg-green-600 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                    >
                        <PlusSquare size={15} />
                        Agregar Stand
                    </button>
                </div>
            </div>

            {/* Propiedades */}
            <div className="p-4 border-b flex-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Propiedades
                </p>

                {standSeleccionado ? (
                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="col-span-2">
                                <label className="text-xs text-gray-500 font-medium">Código</label>
                                <input
                                    name="codigo"
                                    value={form.codigo}
                                    onChange={handleChange}
                                    className="w-full border p-1.5 rounded text-sm mt-0.5"
                                />
                            </div>
                            {(["x", "y", "ancho", "alto", "rotacion"] as const).map((campo) => (
                                <div key={campo}>
                                    <label className="text-xs text-gray-500 font-medium capitalize">{campo}</label>
                                    <input
                                        name={campo}
                                        type="number"
                                        value={form[campo]}
                                        onChange={handleChange}
                                        className="w-full border p-1.5 rounded text-sm mt-0.5"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Badge estado basado en estado_id */}
                        <div className="flex items-center gap-2">
                            <span className={`inline-block px-2 py-1 rounded text-xs font-bold
                ${esActivo
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-600"}`}
                            >
                                {esActivo ? "● Activo" : "○ Inactivo"}
                            </span>
                            <span className="text-xs text-gray-400">
                                ID #{standSeleccionado.stand_id}
                            </span>
                        </div>

                        <button
                            onClick={() => onEliminarStand(standSeleccionado.stand_id)}
                            className="w-full flex items-center justify-center gap-2 bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded text-sm font-medium hover:bg-red-100 transition"
                        >
                            <Trash2 size={14} />
                            Inactivar Stand
                        </button>
                    </div>
                ) : (
                    <p className="text-sm text-gray-400 text-center mt-4">
                        {tool === "add"
                            ? "Hacé clic en el canvas para agregar un stand"
                            : "Seleccioná un stand para ver sus propiedades"}
                    </p>
                )}
            </div>

            {/* Footer */}
            <div className="p-4">
                {hayPendientes && (
                    <p className="text-xs text-yellow-600 font-semibold mb-2">● Cambios sin guardar</p>
                )}
                <button
                    onClick={onGuardarCambios}
                    disabled={guardando || !hayPendientes}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-3 py-2 rounded text-sm font-bold hover:bg-green-700 transition disabled:opacity-40"
                >
                    <Save size={14} />
                    {guardando ? "Guardando..." : "Guardar Cambios"}
                </button>
            </div>

        </aside>
    )
}