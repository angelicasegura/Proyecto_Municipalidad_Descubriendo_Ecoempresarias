import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Alert, AlertDescription } from "../../../components/ui/alert"
import { Leaf, LogIn, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { loginUser } from "../../auth/login/Actions/handleLogin"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    contrasena: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un email valido"
    }

    if (!formData.contrasena) {
      newErrors.contrasena = "La contrasena es requerida"
    } else if (formData.contrasena.length < 6) {
      newErrors.contrasena = "La contrasena debe tener al menos 6 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // TODO: Conectar con API - POST /api/auth/login
 

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
              Ecoempresarias
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-1">
              Inicia sesion para acceder al panel
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={async (e) => {
            e.preventDefault()
            setLoginError(null)
            if (!validateForm()) return
            setIsLoading(true)
            try {
              const response = await loginUser(formData)
              console.log("Login response:", response)
              window.location.href = "/"
            } catch (error) {
              setLoginError(error instanceof Error ? error.message : "Error al iniciar sesion")
            } finally {
              setIsLoading(false)
            }
          }} className="space-y-4">
            {loginError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}

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
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contrasena">Contrasena</Label>
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

            <div className="flex items-center justify-end">
              <Link
                href="/recuperar-contrasena"
                className="text-sm text-[var(--azul-principal)] hover:underline"
              >
                Olvidaste tu contrasena?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-[var(--azul-principal)] hover:bg-[var(--azul-principal)]/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesion...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Iniciar Sesion
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            No tienes una cuenta?{" "}
            <Link
              href="/registro"
              className="text-[var(--azul-principal)] hover:underline font-medium"
            >
              Registrate aqui
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
