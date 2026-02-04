import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Alert, AlertDescription } from "../../../components/ui/alert"
import { Leaf, UserPlus, AlertCircle, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"

type RolOption = {
  id: number
  nombre: string
}

export default function RegisterPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    contrasena: "",
    rolId: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [registerError, setRegisterError] = useState<string | null>(null)
  const [roles, setRoles] = useState<RolOption[]>([
    { id: 2, nombre: "Emprendedor" },
    { id: 3, nombre: "Comprador" },
  ])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido"
    }

    if (!formData.email) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un email válido"
    }

    if (!formData.contrasena) {
      newErrors.contrasena = "La contraseña es requerida"
    } else if (formData.contrasena.length < 6) {
      newErrors.contrasena = "La contraseña debe tener al menos 6 caracteres"
    }

    if (!formData.rolId) {
      newErrors.rolId = "Selecciona un tipo de usuario"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const registrarUsuario = async () => {
    const url = "https://localhost:7050/auth"

    const payload = {
      nombre: formData.nombre,
      email: formData.email,
      contrasena: formData.contrasena,
      rol_id: Number(formData.rolId),
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const msg = await res.text()
      throw new Error(msg || "No se pudo registrar el usuario")
    }

    try {
      return await res.json()
    } catch {
      return null
    }
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

              if (!validateForm()) return

              setIsLoading(true)
              try {
                await registrarUsuario()
                // Éxito: manda a login
                navigate("/login")
              } catch (error) {
                setRegisterError(
                  error instanceof Error ? error.message : "Error al registrarse"
                )
              } finally {
                setIsLoading(false)
              }
            }}
          >
            {registerError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{registerError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className={errors.nombre ? "border-destructive" : ""}
                disabled={isLoading}
              />
              {errors.nombre && <p className="text-sm text-destructive">{errors.nombre}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? "border-destructive" : ""}
                disabled={isLoading}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contrasena">Contraseña</Label>
              <Input
                id="contrasena"
                type="password"
                placeholder="********"
                value={formData.contrasena}
                onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
                className={errors.contrasena ? "border-destructive" : ""}
                disabled={isLoading}
              />
              {errors.contrasena && (
                <p className="text-sm text-destructive">{errors.contrasena}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rol">Tipo de usuario</Label>
              <select
                id="rol"
                value={formData.rolId}
                onChange={(e) => setFormData({ ...formData, rolId: e.target.value })}
                disabled={isLoading}
                className={`w-full h-10 rounded-md border px-3 text-sm bg-white ${
                  errors.rolId ? "border-destructive" : "border-input"
                }`}
              >
                <option value="">Selecciona...</option>
                {roles.map((r) => (
                  <option key={r.id} value={String(r.id)}>
                    {r.nombre}
                  </option>
                ))}
              </select>
              {errors.rolId && <p className="text-sm text-destructive">{errors.rolId}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-[var(--azul-principal)] hover:bg-[var(--azul-principal)]/90 text-white"
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

          <div className="mt-6 text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-[var(--azul-principal)] hover:underline font-medium">
              Inicia sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
