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
// Eliminamos TIPOS_ACTIVIDAD del import porque ya no existe como constante
import { type Emprendedor, type TipoActividad } from "../../../../types/emprendedoresType"

interface modalCrearEmprendimientoProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  // Agregamos la prop para recibir los tipos desde la base de datos
  tiposActividad: TipoActividad[] 
  onSubmit: (emprendedor: Omit<Emprendedor, "emprendedor_id" | "estado_id">) => void
}

export function ModalCrearEmprendimiento({ 
  open, 
  onOpenChange, 
  tiposActividad, 
  onSubmit 
}: modalCrearEmprendimientoProps) {
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
        cedulaJuridica: formData.cedula_juridica,
        telefono: formData.telefono,
        email: formData.correo,
        direccion: formData.direccion,
        tipoActividadId: Number(formData.tipo_actividad_id),
        estadoId: 1,
      })
      
      // Reset 
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
          
          {/* ... otros campos de Input iguales ... */}

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
                {/* Ahora iteramos sobre la prop dinámica tiposActividad */}
                {tiposActividad.map((tipo) => (
                  <SelectItem key={tipo.tipoActividadId} value={String(tipo.tipoActividadId)}>
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
            <Button type="button" variant="secondary" className="bg-[#ff0707] hover:bg-[#790000] text-white" onClick={() => handleClose(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#54b413] hover:bg-[#3c810e] text-white">
              <Save className="h-4 w-4 mr-2" />
              Registrar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}