import type React from "react"
import { useState } from "react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select"
import { PlusCircle, Save } from "lucide-react"
import { type Emprendedor, TIPOS_ACTIVIDAD } from "../../../../types/emprendedoresType"

interface modalCrearEmprendimientoProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (emprendedor: Omit<Emprendedor, "emprendedor_id" | "estado_id">) => void
}

export function ModalCrearEmprendimiento({ open, onOpenChange, onSubmit }: modalCrearEmprendimientoProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    cedula_juridica: "",
    telefono: "",
    correo: "",
    direccion: "",
    tipo_actividad_id: "",
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, boolean> = {}

    if (!formData.nombre) newErrors.nombre = true
    if (!formData.cedula_juridica) newErrors.cedula_juridica = true
    if (!formData.telefono) newErrors.telefono = true
    if (!formData.correo) newErrors.correo = true
    if (!formData.direccion) newErrors.direccion = true
    if (!formData.tipo_actividad_id) newErrors.tipo_actividad_id = true

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0 && formData.tipo_actividad_id) {
      onSubmit({
        nombre: formData.nombre,
        cedula_juridica: formData.cedula_juridica,
        telefono: formData.telefono,
        correo: formData.correo,
        direccion: formData.direccion,
        tipo_actividad_id: Number(formData.tipo_actividad_id),
      })
      setFormData({
        nombre: "",
        cedula_juridica: "",
        telefono: "",
        correo: "",
        direccion: "",
        tipo_actividad_id: "",
      })
      setErrors({})
    }
  }

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setFormData({
        nombre: "",
        cedula_juridica: "",
        telefono: "",
        correo: "",
        direccion: "",
        tipo_actividad_id: "",
      })
      setErrors({})
    }
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="bg-[#056F94] -m-6 mb-0 p-6 rounded-t-lg">
          <DialogTitle className="flex items-center gap-2 text-white">
            <PlusCircle className="h-5 w-5" />
            Registrar Nuevo Emprendedor
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">
              Nombre <span className="text-destructive">*</span>
            </Label>
            <Input
              id="nombre"
              placeholder="Nombre completo"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className={errors.nombre ? "border-destructive" : ""}
            />
            {errors.nombre && (
              <p className="text-sm text-destructive">El nombre es obligatorio</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cedula_juridica">
                Cédula Jurídica <span className="text-destructive">*</span>
              </Label>
              <Input
                id="cedula_juridica"
                placeholder="Ej: 3-101-456789"
                value={formData.cedula_juridica}
                onChange={(e) => setFormData({ ...formData, cedula_juridica: e.target.value })}
                className={errors.cedula_juridica ? "border-destructive" : ""}
              />
              {errors.cedula_juridica && (
                <p className="text-sm text-destructive">Cédula jurídica inválida o ya existe</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">
                Teléfono <span className="text-destructive">*</span>
              </Label>
              <Input
                id="telefono"
                type="tel"
                placeholder="Ej: +506 2222-2222"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className={errors.telefono ? "border-destructive" : ""}
              />
              {errors.telefono && (
                <p className="text-sm text-destructive">El teléfono es obligatorio</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="correo">
              Correo Electrónico <span className="text-destructive">*</span>
            </Label>
            <Input
              id="correo"
              type="email"
              placeholder="correo@ejemplo.com"
              value={formData.correo}
              onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              className={errors.correo ? "border-destructive" : ""}
            />
            {errors.correo && (
              <p className="text-sm text-destructive">Correo inválido o ya existe</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="direccion">
              Dirección <span className="text-destructive">*</span>
            </Label>
            <Input
              id="direccion"
              placeholder="Dirección completa"
              value={formData.direccion}
              onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              className={errors.direccion ? "border-destructive" : ""}
            />
            {errors.direccion && (
              <p className="text-sm text-destructive">La dirección es obligatoria</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo_actividad_id">
              Tipo de Actividad <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.tipo_actividad_id}
              onValueChange={(value) => setFormData({ ...formData, tipo_actividad_id: value })}
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
            <Button type="button" variant="secondary" className="bg-[#ff0707] hover:bg-[#790000] text-white cursor-pointer" onClick={() => handleClose(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#54b413] hover:bg-[#3c810e] text-white cursor-pointer">
              <Save className="h-4 w-4 mr-2" />
              Registrar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
