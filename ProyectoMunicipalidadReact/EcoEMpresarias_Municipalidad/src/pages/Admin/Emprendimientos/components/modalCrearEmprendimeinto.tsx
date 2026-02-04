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
import { PlusCircle, Save, Building2, Phone, Mail, MapPin, Fingerprint, User } from "lucide-react"
import { type TipoActividad } from "../../../../types/emprendedoresType"

interface ModalCrearEmprendimientoProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tiposActividad: TipoActividad[] 
  onSubmit: (data: any) => void
}

export function ModalCrearEmprendimiento({ 
  open, 
  onOpenChange, 
  tiposActividad, 
  onSubmit 
}: ModalCrearEmprendimientoProps) {
  
  // Estado inicial con todos los campos que requiere tu API
  const [formData, setFormData] = useState({
    nombre: "",
    cedulaJuridica: "",
    telefono: "",
    email: "",
    direccion: "",
    tipoActividadId: "",
    usuarioId: "", // ID del dueño (ej: 119770693)
  })

  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const validate = () => {
    const newErrors: Record<string, boolean> = {}
    if (!formData.nombre) newErrors.nombre = true
    if (!formData.cedulaJuridica) newErrors.cedulaJuridica = true
    if (!formData.telefono) newErrors.telefono = true
    if (!formData.email) newErrors.email = true
    if (!formData.tipoActividadId) newErrors.tipoActividadId = true
    if (!formData.usuarioId) newErrors.usuarioId = true
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validate()) {
      // Enviamos el objeto formateado exactamente como lo espera el controlador C#
      onSubmit({
        nombre: formData.nombre,
        cedulaJuridica: formData.cedulaJuridica,
        telefono: formData.telefono,
        email: formData.email,
        direccion: formData.direccion,
        tipoActividadId: Number(formData.tipoActividadId),
        usuarioId: Number(formData.usuarioId),
        estadoId: 1 // Por defecto Activo
      })
      handleClose(false)
    }
  }

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setFormData({
        nombre: "",
        cedulaJuridica: "",
        telefono: "",
        email: "",
        direccion: "",
        tipoActividadId: "",
        usuarioId: "",
      })
      setErrors({})
    }
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[650px] max-h-[95vh] overflow-y-auto">
        <DialogHeader className="bg-[#056F94] -m-6 mb-2 p-6 rounded-t-lg">
          <DialogTitle className="flex items-center gap-2 text-white text-xl">
            <PlusCircle className="h-6 w-6" />
            Registrar Nuevo Emprendimiento
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          
          {/* SECCIÓN 1: Información del Dueño */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <User className="h-4 w-4" /> Datos del Propietario
            </h3>
            <div className="space-y-2">
              <Label htmlFor="usuarioId">ID de Usuario (Dueño) <span className="text-red-500">*</span></Label>
              <Input 
                id="usuarioId"
                placeholder="Ej: 119770693"
                className={errors.usuarioId ? "border-red-500 shadow-sm" : ""}
                value={formData.usuarioId}
                onChange={(e) => setFormData({...formData, usuarioId: e.target.value})}
              />
            </div>
          </div>

          {/* SECCIÓN 2: Detalles del Negocio */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="h-4 w-4" /> Detalles del Negocio
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre Comercial <span className="text-red-500">*</span></Label>
                <Input 
                  id="nombre"
                  placeholder="Nombre del emprendimiento"
                  className={errors.nombre ? "border-red-500" : ""}
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cedula">Cédula Jurídica <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Fingerprint className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    id="cedula"
                    placeholder="X-XXX-XXXXXX"
                    maxLength={12}
                    className={`pl-10 ${errors.cedulaJuridica ? "border-red-500" : ""}`}
                    value={formData.cedulaJuridica}
                    onChange={(e) => setFormData({...formData, cedulaJuridica: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipoActividadId">Tipo de Actividad <span className="text-red-500">*</span></Label>
                <Select
                  value={formData.tipoActividadId}
                  onValueChange={(value) => setFormData({ ...formData, tipoActividadId: value })}
                >
                  <SelectTrigger className={errors.tipoActividadId ? "border-red-500" : ""}>
                    <SelectValue placeholder="Seleccione una actividad" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposActividad.map((tipo) => (
                      <SelectItem key={`modal-act-${tipo.tipoActividadId}`} value={String(tipo.tipoActividadId)}>
                        {tipo.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono de Contacto <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    id="telefono"
                    placeholder="8888-8888"
                    className={`pl-10 ${errors.telefono ? "border-red-500" : ""}`}
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico <span className="text-red-500">*</span></Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input 
                  id="email"
                  type="email"
                  placeholder="contacto@ejemplo.com"
                  className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección Física</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input 
                  id="direccion"
                  placeholder="Provincia, Cantón, señas exactas..."
                  className="pl-10"
                  value={formData.direccion}
                  onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-3 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              className="border-red-200 text-red-600 hover:bg-red-50"
              onClick={() => handleClose(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#54b413] hover:bg-[#3c810e] text-white px-8">
              <Save className="h-4 w-4 mr-2" />
              Guardar Emprendimiento
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}