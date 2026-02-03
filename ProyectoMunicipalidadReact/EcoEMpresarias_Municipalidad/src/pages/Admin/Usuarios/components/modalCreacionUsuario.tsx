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
import { UserPlus, Save } from "lucide-react"
import { type User, ROLES } from "../../../../types/userType"

interface ModalCreacionUsuarioProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  // Recibimos un objeto que cumple con la interfaz User
  onSubmit: (userData: User) => void 
}

export function ModalCreacionUsuario({ open, onOpenChange, onSubmit }: ModalCreacionUsuarioProps) {
  const [formData, setFormData] = useState({
    idUsuario: "", 
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    edad: "",
    idRol: "",
  })
  
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, boolean> = {}

    // Validaciones básicas
    if (!formData.idUsuario) newErrors.idUsuario = true
    if (!formData.nombre) newErrors.nombre = true
    if (!formData.apellidos) newErrors.apellidos = true
    if (!formData.email) newErrors.email = true
    if (!formData.telefono) newErrors.telefono = true
    if (!formData.edad) newErrors.edad = true
    if (!formData.idRol) newErrors.idRol = true

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Construimos el objeto final respetando EXACTAMENTE tu interfaz User
      onSubmit({
        idUsuario: Number(formData.idUsuario),
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        email: formData.email,
        telefono: formData.telefono,
        edad: formData.edad,             // Se envía como string según tu interfaz
        idRol: Number(formData.idRol),
        idEstado: 1,                     // Activo por defecto
        ruta_Imagen_Perfil: "",          // No está en el form, va vacío
        contrasena: "Temporal123*",     // No está en el form, se envía una genérica para el SP
      })

      handleClose(false)
    }
  }

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setFormData({
        idUsuario: "",
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        edad: "",
        idRol: "",
      })
      setErrors({})
    }
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-150">
        <DialogHeader className="bg-[#056F94] text-white -m-6 mb-0 p-6 rounded-t-lg">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <UserPlus className="h-5 w-5" />
            Crear Nuevo Usuario
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* ID Usuario */}
            <div className="space-y-2">
              <Label htmlFor="idUsuario">Identificación <span className="text-destructive">*</span></Label>
              <Input
                id="idUsuario"
                type="number"
                placeholder="Ej: 119770677"
                value={formData.idUsuario}
                onChange={(e) => setFormData({ ...formData, idUsuario: e.target.value })}
                className={errors.idUsuario ? "border-destructive" : ""}
              />
            </div>

            {/* Nombre */}
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre <span className="text-destructive">*</span></Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className={errors.nombre ? "border-destructive" : ""}
              />
            </div>

            {/* Apellidos */}
            <div className="space-y-2">
              <Label htmlFor="apellidos">Apellidos <span className="text-destructive">*</span></Label>
              <Input
                id="apellidos"
                value={formData.apellidos}
                onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                className={errors.apellidos ? "border-destructive" : ""}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? "border-destructive" : ""}
              />
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono <span className="text-destructive">*</span></Label>
              <Input
                id="telefono"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className={errors.telefono ? "border-destructive" : ""}
              />
            </div>

            {/* Edad */}
            <div className="space-y-2">
              <Label htmlFor="edad">Edad <span className="text-destructive">*</span></Label>
              <Input
                id="edad"
                type="number"
                value={formData.edad}
                onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                className={errors.edad ? "border-destructive" : ""}
              />
            </div>

            {/* Rol */}
            <div className="space-y-2">
              <Label htmlFor="idRol">Rol <span className="text-destructive">*</span></Label>
              <Select
                value={formData.idRol}
                onValueChange={(value) => setFormData({ ...formData, idRol: value })}
              >
                <SelectTrigger className={errors.idRol ? "border-destructive" : ""}>
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((rol) => (
                    <SelectItem key={rol.rol_id} value={String(rol.rol_id)}>
                      {rol.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="mt-6 border-t pt-4">
            <Button type="button" variant="secondary" className="bg-[#ff0707] hover:bg-[#790000] text-white" onClick={() => handleClose(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#54b413] hover:bg-[#3c810e] text-white">
              <Save className="h-4 w-4 mr-2" />
              Crear Usuario
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}