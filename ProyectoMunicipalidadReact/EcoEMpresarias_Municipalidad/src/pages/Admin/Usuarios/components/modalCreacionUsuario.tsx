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
  onSubmit: (user: Omit<User, "usuario_id" | "estado_id">) => void
}

export function ModalCreacionUsuario({ open, onOpenChange, onSubmit }: ModalCreacionUsuarioProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    contrasena: "",
    edad: "",
    rol_id: "",
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, boolean> = {}

    if (!formData.nombre) newErrors.nombre = true
    if (!formData.apellidos) newErrors.apellidos = true
    if (!formData.email) newErrors.email = true
    if (!formData.telefono) newErrors.telefono = true
    if (!formData.contrasena) newErrors.contrasena = true
    if (!formData.edad || Number(formData.edad) <= 0) newErrors.edad = true
    if (!formData.rol_id) newErrors.rol_id = true

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0 && formData.rol_id) {
      onSubmit({
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        email: formData.email,
        telefono: formData.telefono,
        contrasena: formData.contrasena,
        edad: Number(formData.edad),
        rol_id: Number(formData.rol_id),
      })
      setFormData({
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        contrasena: "",
        edad: "",
        rol_id: "",
      })
      setErrors({})
    }
  }

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setFormData({
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        contrasena: "",
        edad: "",
        rol_id: "",
      })
      setErrors({})
    }
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-150">
        <DialogHeader className="bg-[#056F94] text-primary-foreground -m-6 mb-0 p-6 rounded-t-lg">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <UserPlus className="h-5 w-5" />
            Crear Nuevo Usuario
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">
                Nombre <span className="text-destructive">*</span>
              </Label>
              <Input
                id="nombre"
                placeholder="Ej: Juan"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className={errors.nombre ? "border-destructive" : ""}
              />
              {errors.nombre && (
                <p className="text-sm text-destructive">El nombre es requerido.</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="apellidos">
                Apellidos <span className="text-destructive">*</span>
              </Label>
              <Input
                id="apellidos"
                placeholder="Ej: Perez Garcia"
                value={formData.apellidos}
                onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                className={errors.apellidos ? "border-destructive" : ""}
              />
              {errors.apellidos && (
                <p className="text-sm text-destructive">Los apellidos son requeridos.</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ecoempresarias.mx"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">Ingresa un email valido.</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">
                Telefono <span className="text-destructive">*</span>
              </Label>
              <Input
                id="telefono"
                type="tel"
                placeholder="+52 555-1234"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className={errors.telefono ? "border-destructive" : ""}
              />
              {errors.telefono && (
                <p className="text-sm text-destructive">El telefono es requerido.</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contrasena">
                Contrasena <span className="text-destructive">*</span>
              </Label>
              <Input
                id="contrasena"
                type="password"
                placeholder="********"
                value={formData.contrasena}
                onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
                className={errors.contrasena ? "border-destructive" : ""}
              />
              {errors.contrasena && (
                <p className="text-sm text-destructive">La contrasena es requerida.</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edad">
                Edad <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edad"
                type="number"
                placeholder="25"
                min="1"
                value={formData.edad}
                onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                className={errors.edad ? "border-destructive" : ""}
              />
              {errors.edad && (
                <p className="text-sm text-destructive">La edad debe ser mayor a 0.</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rol_id">
                Rol <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.rol_id}
                onValueChange={(value) => setFormData({ ...formData, rol_id: value })}
              >
                <SelectTrigger className={errors.rol_id ? "border-destructive" : ""}>
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
              {errors.rol_id && (
                <p className="text-sm text-destructive">Debes seleccionar un rol.</p>
              )}
            </div>
          </div>

          <DialogFooter className="mt-6 border-t pt-4">
            <Button type="button" variant="secondary" className="bg-[#ff0707] hover:bg-[#790000] text-white cursor-pointer" onClick={() => handleClose(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#54b413] hover:bg-[#3c810e] text-white font-semibold cursor-pointer">
              <Save className="h-4 w-4 mr-2" />
              Crear Usuario
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
