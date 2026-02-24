import type React from "react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter,
} from "../../../../components/ui/dialog"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import { Alert, AlertDescription } from "../../../../components/ui/alert"
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "../../../../components/ui/select"
import { Pencil, Save, AlertTriangle } from "lucide-react"
import type { Emprendedor, TipoActividad } from "../../../../types/emprendedoresType"
import { editarEmprendimiento } from "../../../../types/emprendedoresType"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  emprendedor: Emprendedor | null
  tiposActividad: TipoActividad[]
  onSubmit: () => void  // solo refresca la tabla, sin parámetros
}

export function EditarEmprendedor({ open, onOpenChange, emprendedor, tiposActividad, onSubmit }: Props) {
  const [formData, setFormData] = useState({
    nombre: "",
    cedula_juridica: "",
    telefono: "",
    correo: "",
    direccion: "",
    descripcion: "",
    tipo_actividad_id: "",
  })
  const [imagen, setImagen] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)

  const isInactive = emprendedor?.estadoId === 2

  // Prellenamos el formulario cuando cambia el emprendedor
  useEffect(() => {
    if (emprendedor) {
      setFormData({
        nombre: emprendedor.nombre,
        cedula_juridica: emprendedor.cedulaJuridica,
        telefono: emprendedor.telefono,
        correo: emprendedor.email,
        direccion: emprendedor.direccion,
        descripcion: emprendedor.descripcion ?? "",
        tipo_actividad_id: String(emprendedor.tipoActividadId),
      })
      setImagen(null)
      setErrors({})
    }
  }, [emprendedor])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emprendedor || isInactive) return

    // Validaciones
    const newErrors: Record<string, boolean> = {}
    if (!formData.nombre) newErrors.nombre = true
    if (!formData.cedula_juridica) newErrors.cedula_juridica = true
    if (!formData.telefono) newErrors.telefono = true
    if (!formData.correo) newErrors.correo = true
    if (!formData.direccion) newErrors.direccion = true
    if (!formData.tipo_actividad_id) newErrors.tipo_actividad_id = true
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    // Armamos el FormData para enviarlo con posible imagen
    const fd = new FormData()
    fd.append("Nombre", formData.nombre)
    fd.append("CedulaJuridica", formData.cedula_juridica)    // 👈 sin guión bajo
    fd.append("Telefono", formData.telefono)
    fd.append("Email", formData.correo)
    fd.append("Direccion", formData.direccion)
    fd.append("Descripcion", formData.descripcion)
    fd.append("TipoActividadId", formData.tipo_actividad_id) // 👈 sin guión bajo
    fd.append("EstadoId", String(emprendedor.estadoId))      // 👈 faltaba, es required
    fd.append("UsuarioId", String(emprendedor.usuarioId ?? 0)) // 👈 faltaba, es required
    if (emprendedor.ruta_Imagen_Logo && !imagen) {
      fd.append("Ruta_Imagen_Logo", emprendedor.ruta_Imagen_Logo)
    }
    if (imagen) {
      fd.append("Imagen", imagen)
    }

    setLoading(true)
    try {
      await editarEmprendimiento(emprendedor.emprendimientoId, fd)
      toast.success("Emprendimiento actualizado correctamente")
      onSubmit()       // refresca la tabla
      onOpenChange(false)
    } catch (err) {
      toast.error("Ocurrió un error al guardar los cambios")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) setErrors({})
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="bg-[#056F94] -m-6 mb-0 p-6 rounded-t-lg">
          <DialogTitle className="flex items-center gap-2 text-white">
            <Pencil className="h-5 w-5" />
            Editar Emprendimiento
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {isInactive && (
            <Alert variant="destructive" className="bg-yellow-50 border-yellow-200 text-yellow-800">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                No se puede editar un emprendimiento inactivo. Activalo primero.
              </AlertDescription>
            </Alert>
          )}

          {/* Nombre */}
          <div className="space-y-2">
            <Label>Nombre <span className="text-destructive">*</span></Label>
            <Input
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className={errors.nombre ? "border-destructive" : ""}
              disabled={isInactive}
            />
            {errors.nombre && <p className="text-sm text-destructive">El nombre es obligatorio</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cédula jurídica */}
            <div className="space-y-2">
              <Label>Cédula Jurídica <span className="text-destructive">*</span></Label>
              <Input
                value={formData.cedula_juridica}
                onChange={(e) => setFormData({ ...formData, cedula_juridica: e.target.value })}
                className={errors.cedula_juridica ? "border-destructive" : ""}
                disabled={isInactive}
              />
              {errors.cedula_juridica && <p className="text-sm text-destructive">La cédula es obligatoria</p>}
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
              <Label>Teléfono <span className="text-destructive">*</span></Label>
              <Input
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className={errors.telefono ? "border-destructive" : ""}
                disabled={isInactive}
              />
              {errors.telefono && <p className="text-sm text-destructive">El teléfono es obligatorio</p>}
            </div>
          </div>

          {/* Correo */}
          <div className="space-y-2">
            <Label>Correo Electrónico <span className="text-destructive">*</span></Label>
            <Input
              type="email"
              value={formData.correo}
              onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              className={errors.correo ? "border-destructive" : ""}
              disabled={isInactive}
            />
            {errors.correo && <p className="text-sm text-destructive">Correo inválido o vacío</p>}
          </div>

          {/* Dirección */}
          <div className="space-y-2">
            <Label>Dirección <span className="text-destructive">*</span></Label>
            <Input
              value={formData.direccion}
              onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              className={errors.direccion ? "border-destructive" : ""}
              disabled={isInactive}
            />
            {errors.direccion && <p className="text-sm text-destructive">La dirección es obligatoria</p>}
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label>Descripción</Label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              rows={3}
              maxLength={100}
              disabled={isInactive}
              placeholder="Descripción breve del emprendimiento..."
            />
          </div>

          {/* Tipo de actividad */}
          <div className="space-y-2">
            <Label>Tipo de Actividad <span className="text-destructive">*</span></Label>
            <Select
              value={formData.tipo_actividad_id}
              onValueChange={(value) => setFormData({ ...formData, tipo_actividad_id: value })}
              disabled={isInactive}
            >
              <SelectTrigger className={errors.tipo_actividad_id ? "border-destructive" : ""}>
                <SelectValue placeholder="Seleccioná un tipo" />
              </SelectTrigger>
              <SelectContent>
                {tiposActividad.map((tipo) => (
                  <SelectItem key={tipo.tipoActividadId} value={String(tipo.tipoActividadId)}>
                    {tipo.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.tipo_actividad_id && <p className="text-sm text-destructive">Seleccioná una actividad</p>}
          </div>

          {/* Logo */}
          <div className="space-y-2">
            <Label>Logo del emprendimiento</Label>
            {emprendedor?.ruta_Imagen_Logo && !imagen && (
              <div className="mb-2">
                <img
                  src={`https://localhost:7050/api/Images/Buscar/3/${emprendedor.ruta_Imagen_Logo}`}
                  alt="Logo actual"
                  className="h-16 w-16 rounded-full object-cover border"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Logo actual (subí uno nuevo para reemplazarlo)
                </p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              disabled={isInactive}
              onChange={(e) => setImagen(e.target.files?.[0] ?? null)}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
          </div>

          <DialogFooter className="gap-2 pt-4">
            <Button
              type="button"
              variant="secondary"
              className="bg-[#ff0707] hover:bg-[#790000] text-white cursor-pointer"
              onClick={() => handleClose(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isInactive || loading}
              className={isInactive ? "opacity-50 cursor-not-allowed" : "bg-[#54b413] hover:bg-[#3c810e] text-white cursor-pointer"}
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}