import type React from "react"
import { useState, useEffect } from "react"
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
import { Pencil, Save } from "lucide-react"
import { type User, ROLES, ESTADOS } from "../../../../types/userType"

interface ModalEdicionUsuarioProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (user: User) => void
  userToEdit: User | null 
}

export function ModalEdicionUsuario({ open, onOpenChange, onSubmit, userToEdit }: ModalEdicionUsuarioProps) {
  const [formData, setFormData] = useState<User>({
    idUsuario: 0,
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    contrasena: "",
    edad: "",
    idRol: 3,
    idEstado: 1,
    ruta_Imagen_Perfil: ""
  })

  const [errors, setErrors] = useState<Record<string, boolean>>({})

  
  useEffect(() => {
    if (userToEdit) {
      setFormData({
        ...userToEdit,
        contrasena: "" 
      })
    }
  }, [userToEdit, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, boolean> = {}

    if (!formData.nombre) newErrors.nombre = true
    if (!formData.apellidos) newErrors.apellidos = true
    if (!formData.email) newErrors.email = true
    if (!formData.telefono) newErrors.telefono = true
    if (!formData.edad || Number(formData.edad) <= 0) newErrors.edad = true

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="bg-[#056F94] text-primary-foreground -m-6 mb-0 p-6 rounded-t-lg">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Pencil className="h-5 w-5" />
            Editar Usuario: {userToEdit?.nombre}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Nombre */}
            <div className="space-y-2">
              <Label htmlFor="edit-nombre">Nombre <span className="text-destructive">*</span></Label>
              <Input
                id="edit-nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className={errors.nombre ? "border-destructive" : ""}
              />
            </div>

            {/* Apellidos */}
            <div className="space-y-2">
              <Label htmlFor="edit-apellidos">Apellidos <span className="text-destructive">*</span></Label>
              <Input
                id="edit-apellidos"
                value={formData.apellidos}
                onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                className={errors.apellidos ? "border-destructive" : ""}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email <span className="text-destructive">*</span></Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? "border-destructive" : ""}
              />
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
              <Label htmlFor="edit-telefono">Teléfono <span className="text-destructive">*</span></Label>
              <Input
                id="edit-telefono"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className={errors.telefono ? "border-destructive" : ""}
              />
            </div>

            

            {/* Edad */}
            <div className="space-y-2">
              <Label htmlFor="edit-edad">Edad <span className="text-destructive">*</span></Label>
              <Input
                id="edit-edad"
                type="number"
                value={formData.edad}
                onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                className={errors.edad ? "border-destructive" : ""}
              />
            </div>

            {/* Rol */}
            <div className="space-y-2">
              <Label htmlFor="edit-rol">Rol <span className="text-destructive">*</span></Label>
              <Select
                value={String(formData.idRol)}
                onValueChange={(val) => setFormData({ ...formData, idRol: Number(val) })}
              >
                <SelectTrigger id="edit-rol">
                  <SelectValue />
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

            {/* Estado (AÑADIDO) */}
            <div className="space-y-2">
              <Label htmlFor="edit-estado">Estado <span className="text-destructive">*</span></Label>
              <Select
                value={String(formData.idEstado)}
                onValueChange={(val) => setFormData({ ...formData, idEstado: Number(val) })}
              >
                <SelectTrigger id="edit-estado">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ESTADOS.map((est) => (
                    <SelectItem key={est.estado_id} value={String(est.estado_id)}>
                      {est.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="mt-6 border-t pt-4">
            <Button type="button" variant="secondary" className="bg-[#ff0707] hover:bg-[#790000] text-white" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#056F94] hover:bg-[#045a78] text-white font-semibold">
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
