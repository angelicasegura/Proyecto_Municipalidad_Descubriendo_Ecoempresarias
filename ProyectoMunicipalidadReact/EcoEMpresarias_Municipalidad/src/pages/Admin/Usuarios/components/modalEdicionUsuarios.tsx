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
import { UserCog, Save, Info } from "lucide-react"
import { type User, ROLES } from "../../../../types/userType"

interface ModalEdicionUsuariosProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
  onSubmit: (user: User) => void
}

export function ModalEdicionUsuarios({ open, onOpenChange, user, onSubmit }: ModalEdicionUsuariosProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    edad: "",
    rol_id: "",
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre,
        apellidos: user.apellidos,
        email: user.email,
        telefono: user.telefono,
        edad: String(user.edad),
        rol_id: String(user.rol_id),
      })
    }
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const newErrors: Record<string, boolean> = {}

    if (!formData.nombre) newErrors.nombre = true
    if (!formData.apellidos) newErrors.apellidos = true
    if (!formData.email) newErrors.email = true
    if (!formData.telefono) newErrors.telefono = true
    if (!formData.edad || Number(formData.edad) <= 0) newErrors.edad = true
    if (!formData.rol_id) newErrors.rol_id = true

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        ...user,
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        email: formData.email,
        telefono: formData.telefono,
        edad: Number(formData.edad),
        rol_id: Number(formData.rol_id),
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
      <DialogContent className="sm:max-w-150">
        <DialogHeader className="bg-primary text-primary-foreground -m-6 mb-0 p-6 rounded-t-lg">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <UserCog className="h-5 w-5" />
            Editar Usuario
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="pt-6">
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Solo los usuarios activos pueden ser editados.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre-edit">
                Nombre <span className="text-destructive">*</span>
              </Label>
              <Input
                id="nombre-edit"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className={errors.nombre ? "border-destructive" : ""}
              />
              {errors.nombre && (
                <p className="text-sm text-destructive">El nombre es requerido.</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="apellidos-edit">
                Apellidos <span className="text-destructive">*</span>
              </Label>
              <Input
                id="apellidos-edit"
                value={formData.apellidos}
                onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                className={errors.apellidos ? "border-destructive" : ""}
              />
              {errors.apellidos && (
                <p className="text-sm text-destructive">Los apellidos son requeridos.</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-edit">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email-edit"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">Ingresa un email valido.</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono-edit">
                Telefono <span className="text-destructive">*</span>
              </Label>
              <Input
                id="telefono-edit"
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className={errors.telefono ? "border-destructive" : ""}
              />
              {errors.telefono && (
                <p className="text-sm text-destructive">El telefono es requerido.</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edad-edit">
                Edad <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edad-edit"
                type="number"
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
              <Label htmlFor="rol_id-edit">
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
            <Button type="button" variant="secondary" onClick={() => handleClose(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
