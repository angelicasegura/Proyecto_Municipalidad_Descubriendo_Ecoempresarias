import { Building2 } from "lucide-react"

interface Emprendimiento {
    emprendimientoId: number
    nombre: string
    ruta_Imagen_Logo?: string
}

interface Props {
    emprendimientos: Emprendimiento[]
    onSeleccionar: (emprendimientoId: number) => void
    onCancelar: () => void
}

const IMG_BASE = "https://localhost:7050/uploads/"

export default function SelectorEmprendimiento({ emprendimientos, onSeleccionar, onCancelar }: Props) {
    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[420px] p-6">

                <div className="flex items-center gap-3 mb-5">
                    <div className="bg-orange-100 p-2 rounded-full">
                        <Building2 className="text-orange-600" size={20} />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-gray-800">¿Con cuál emprendimiento reservás?</h2>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Seleccioná el emprendimiento con el que hiciste la solicitud al evento
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 mb-5">
                    {emprendimientos.map(emp => (
                        <button
                            key={emp.emprendimientoId}
                            onClick={() => onSeleccionar(emp.emprendimientoId)}
                            className="flex items-center gap-3 p-3 border rounded-lg hover:border-orange-400 hover:bg-orange-50 transition text-left"
                        >
                            {emp.ruta_Imagen_Logo ? (
                                <img
                                    src={`${IMG_BASE}${emp.ruta_Imagen_Logo}`}
                                    alt={emp.nombre}
                                    className="w-10 h-10 rounded-full object-cover shrink-0"
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                    <Building2 size={18} className="text-orange-500" />
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-semibold text-gray-800">{emp.nombre}</p>
                                <p className="text-xs text-gray-400">ID: {emp.emprendimientoId}</p>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={onCancelar}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition text-sm font-medium"
                    >
                        Cancelar
                    </button>
                </div>

            </div>
        </div>
    )
}