// Primera pantalla del admin. Muestra dos cards:
// una para productos creados pendientes y otra para editados pendientes.

import { useNavigate } from "react-router-dom"
import { FilePlus2, FilePen } from "lucide-react"

export default function ProductosPendientesPage() {
    const navigate = useNavigate()

    const opciones = [
        {
            titulo: "Productos creados",
            descripcion: "Nuevos productos enviados por emprendedores que esperan tu aprobación para publicarse.",
            icono: <FilePlus2 className="h-10 w-10 text-yellow-600" />,
            color: "border-yellow-200 hover:border-yellow-400 bg-yellow-50/50",
            ruta: "/productos-pendientes/creados",
        },
        {
            titulo: "Productos editados",
            descripcion: "Productos existentes que fueron modificados y necesitan revisión antes de actualizar su información.",
            icono: <FilePen className="h-10 w-10 text-blue-600" />,
            color: "border-blue-200 hover:border-blue-400 bg-blue-50/50",
            ruta: "/productos-pendientes/editados",
        },
    ]

    return (
        <div className="mx-auto max-w-4xl px-4 py-10 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Productos pendientes de aprobación</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Seleccioná una categoría para revisar los productos
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {opciones.map((op) => (
                    <div
                        key={op.ruta}
                        onClick={() => navigate(op.ruta)}
                        className={`cursor-pointer rounded-2xl border-2 p-8 shadow-sm hover:shadow-md transition-all space-y-4 ${op.color}`}
                    >
                        <div className="flex justify-center">{op.icono}</div>
                        <div className="text-center space-y-2">
                            <h3 className="text-lg font-semibold">{op.titulo}</h3>
                            <p className="text-sm text-muted-foreground">{op.descripcion}</p>
                        </div>
                        <div className="text-center pt-2 border-t border-current/10">
                            <span className="text-sm font-medium text-primary">
                                Revisar →
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}