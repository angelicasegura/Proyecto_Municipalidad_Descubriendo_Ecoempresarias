import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Alert, AlertDescription } from "../../../components/ui/alert"
import { Leaf, UserPlus, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react"
import { registrarUsuario } from "./actions/handleRegistro"

export default function RegisterPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    idUsuario: "",
    nombre: "",
    apellidos: "",
    telefono: "",
    email: "",
    contrasena: "",
    edad: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [registerError, setRegisterError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.idUsuario) newErrors.idUsuario = "La cédula es requerida"
    if (!formData.nombre) newErrors.nombre = "El nombre es requerido"
    if (!formData.apellidos) newErrors.apellidos = "Los apellidos son requeridos"
    if (!formData.telefono) newErrors.telefono = "El teléfono es requerido"

    if (!formData.email) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un email válido"
    }

    if (!formData.contrasena) {
      newErrors.contrasena = "La contraseña es requerida"
    } else if (formData.contrasena.length < 6) {
      newErrors.contrasena = "Debe tener al menos 6 caracteres"
    }

    if (!formData.edad) {
      newErrors.edad = "La edad es requerida"
    } else if (Number(formData.edad) < 12) {
      newErrors.edad = "Debes tener al menos 12 años"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--gris-claro)] p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center">
              <Leaf className="h-8 w-8 text-white" />
            </div>
          </div>

          <div>
            <CardTitle className="text-2xl font-bold text-[var(--azul-principal)]">
              Crear cuenta
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-1">
              Regístrate para acceder a la plataforma
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault()
              setRegisterError(null)
              setSuccessMessage(null)

              if (!validateForm()) return

              setIsLoading(true)
              try {
                await registrarUsuario({
                  idUsuario: Number(formData.idUsuario),
                  nombre: formData.nombre,
                  apellidos: formData.apellidos,
                  telefono: formData.telefono,
                  contrasena: formData.contrasena,
                  email: formData.email,
                  edad: Number(formData.edad),
                })

                setSuccessMessage("Registro exitoso. Redirigiendo al login...")
                setTimeout(() => navigate("/login"), 2000)
              } catch (error) {
                setRegisterError(
                  error instanceof Error ? error.message : "Error al registrarse"
                )
              } finally {
                setIsLoading(false)
              }
            }}
          >
            {/* ERROR */}
            {registerError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{registerError}</AlertDescription>
              </Alert>
            )}

            {/* SUCCESS */}
            {successMessage && (
              <Alert className="border-green-500 bg-green-50 text-green-700">
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}

            {/* CEDULA */}
            <div className="space-y-2">
              <Label>Cédula</Label>
              <Input
                placeholder="Sin guiones ni espacios"
                value={formData.idUsuario}
                onChange={(e) =>
                  setFormData({ ...formData, idUsuario: e.target.value })
                }
                className={errors.idUsuario ? "border-destructive" : ""}
              />
              {errors.idUsuario && <p className="text-sm text-destructive">{errors.idUsuario}</p>}
            </div>

            {/* NOMBRE */}
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                className={errors.nombre ? "border-destructive" : ""}
              />
              {errors.nombre && <p className="text-sm text-destructive">{errors.nombre}</p>}
            </div>

            {/* APELLIDOS */}
            <div className="space-y-2">
              <Label>Apellidos</Label>
              <Input
                value={formData.apellidos}
                onChange={(e) =>
                  setFormData({ ...formData, apellidos: e.target.value })
                }
                className={errors.apellidos ? "border-destructive" : ""}
              />
              {errors.apellidos && <p className="text-sm text-destructive">{errors.apellidos}</p>}
            </div>

            {/* TELEFONO */}
            <div className="space-y-2">
              <Label>Teléfono</Label>
              <Input
                placeholder="Sin guiones"
                value={formData.telefono}
                onChange={(e) =>
                  setFormData({ ...formData, telefono: e.target.value })
                }
                className={errors.telefono ? "border-destructive" : ""}
              />
              {errors.telefono && <p className="text-sm text-destructive">{errors.telefono}</p>}
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            {/* CONTRASEÑA */}
            <div className="space-y-2">
              <Label>Contraseña</Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.contrasena}
                  onChange={(e) =>
                    setFormData({ ...formData, contrasena: e.target.value })
                  }
                  className={errors.contrasena ? "border-destructive pr-10" : "pr-10"}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-[var(--azul-principal)]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.contrasena && (
                <p className="text-sm text-destructive">{errors.contrasena}</p>
              )}
            </div>

            {/* EDAD */}
            <div className="space-y-2">
              <Label>Edad</Label>
              <Input
                type="number"
                min={0}
                value={formData.edad}
                onChange={(e) =>
                  setFormData({ ...formData, edad: e.target.value })
                }
                className={errors.edad ? "border-destructive" : ""}
              />
              {errors.edad && <p className="text-sm text-destructive">{errors.edad}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-[var(--azul-principal)] text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registrando...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Registrarse
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-[var(--azul-principal)] font-medium">
              Inicia sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}