import type React from "react"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../../components/ui/dialog"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import { Alert, AlertDescription } from "../../../../components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select"
import { Pencil, Save, AlertTriangle } from "lucide-react"
import { type Emprendedor, TIPOS_ACTIVIDAD } from "../../../../types/emprendedoresType"

interface EditEmprendedorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  emprendedor: Emprendedor | null
  onSubmit: (emprendedor: Emprendedor) => void
}

export function EditarEmprendedor({ open, onOpenChange, emprendedor, onSubmit }: EditEmprendedorDialogProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    cedula_juridica: "",
    telefono: "",
    correo: "",
    direccion: "",
    tipo_actividad_id: "",
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const isInactive = emprendedor?.estado_id === 2

  useEffect(() => {
    if (emprendedor) {
      setFormData({
        nombre: emprendedor.nombre,
        cedula_juridica: emprendedor.cedula_juridica,
        telefono: emprendedor.telefono,
        correo: emprendedor.correo,
        direccion: emprendedor.direccion,
        tipo_actividad_id: String(emprendedor.tipo_actividad_id),
      })
    }
  }, [emprendedor])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emprendedor || isInactive) return

    const newErrors: Record<string, boolean> = {}

    if (!formData.nombre) newErrors.nombre = true
    if (!formData.cedula_juridica) newErrors.cedula_juridica = true
    if (!formData.telefono) newErrors.telefono = true
    if (!formData.correo) newErrors.correo = true
    if (!formData.direccion) newErrors.direccion = true
    if (!formData.tipo_actividad_id) newErrors.tipo_actividad_id = true

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        ...emprendedor,
        nombre: formData.nombre,
        cedula_juridica: formData.cedula_juridica,
        telefono: formData.telefono,
        correo: formData.correo,
        direccion: formData.direccion,
        tipo_actividad_id: Number(formData.tipo_actividad_id),
      })
      setErrors({})
    }
  }

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setErrors({})
    }
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="bg-primary -m-6 mb-0 p-6 rounded-t-lg">
          <DialogTitle className="flex items-center gap-2 text-primary-foreground">
            <Pencil className="h-5 w-5" />
            Editar Emprendedor
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {isInactive && (
            <Alert variant="destructive" className="bg-yellow-50 border-yellow-200 text-yellow-800">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                No se puede editar un emprendedor inactivo
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="nombre-edit">
              Nombre <span className="text-destructive">*</span>
            </Label>
            <Input
              id="nombre-edit"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className={errors.nombre ? "border-destructive" : ""}
              disabled={isInactive}
            />
            {errors.nombre && (
              <p className="text-sm text-destructive">El nombre es obligatorio</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cedula_juridica-edit">
                Cédula Jurídica <span className="text-destructive">*</span>
              </Label>
              <Input
                id="cedula_juridica-edit"
                value={formData.cedula_juridica}
                onChange={(e) => setFormData({ ...formData, cedula_juridica: e.target.value })}
                className={errors.cedula_juridica ? "border-destructive" : ""}
                disabled={isInactive}
              />
              {errors.cedula_juridica && (
                <p className="text-sm text-destructive">Cédula jurídica inválida</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono-edit">
                Teléfono <span className="text-destructive">*</span>
              </Label>
              <Input
                id="telefono-edit"
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className={errors.telefono ? "border-destructive" : ""}
                disabled={isInactive}
              />
              {errors.telefono && (
                <p className="text-sm text-destructive">El teléfono es obligatorio</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="correo-edit">
              Correo Electrónico <span className="text-destructive">*</span>
            </Label>
            <Input
              id="correo-edit"
              type="email"
              value={formData.correo}
              onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              className={errors.correo ? "border-destructive" : ""}
              disabled={isInactive}
            />
            {errors.correo && (
              <p className="text-sm text-destructive">Correo inválido</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="direccion-edit">
              Dirección <span className="text-destructive">*</span>
            </Label>
            <Input
              id="direccion-edit"
              value={formData.direccion}
              onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              className={errors.direccion ? "border-destructive" : ""}
              disabled={isInactive}
            />
            {errors.direccion && (
              <p className="text-sm text-destructive">La dirección es obligatoria</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo_actividad_id-edit">
              Tipo de Actividad <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.tipo_actividad_id}
              onValueChange={(value) => setFormData({ ...formData, tipo_actividad_id: value })}
              disabled={isInactive}
            >
              <SelectTrigger className={errors.tipo_actividad_id ? "border-destructive" : ""}>
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent>
                {TIPOS_ACTIVIDAD.map((tipo) => (
                  <SelectItem key={tipo.tipo_actividad_id} value={String(tipo.tipo_actividad_id)}>
                    {tipo.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.tipo_actividad_id && (
              <p className="text-sm text-destructive">Selecciona un tipo de actividad</p>
            )}
          </div>

          <DialogFooter className="gap-2 pt-4">
            <Button type="button"  className="bg-[#ff0707] hover:bg-[#790000] text-white cursor-pointer" variant="secondary" onClick={() => handleClose(false)} >
              Cancelar
            </Button>
            <Button type="submit" disabled={isInactive} className={isInactive ? "" : "bg-[#54b413] hover:bg-[#3c810e] text-white cursor-pointer"}>
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
