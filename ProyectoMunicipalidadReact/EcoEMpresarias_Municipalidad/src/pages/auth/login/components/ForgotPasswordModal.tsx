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
import { Alert, AlertDescription } from "../../../../components/ui/alert"
import { Mail, Loader2, KeyRound, AlertCircle, CheckCircle2 } from "lucide-react"

interface ForgotPasswordModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ForgotPasswordModal({ open, onOpenChange }: ForgotPasswordModalProps) {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [emailError, setEmailError] = useState(false)

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email || !emailRegex.test(email)) {
            setEmailError(true)
            return false
        }
        setEmailError(false)
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(false)

        if (!validateEmail(email)) return

        setIsLoading(true)
        try {
            const response = await fetch("https://localhost:7050/auth/olvido-contrasena", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            if (!response.ok) {
                throw new Error("Error al enviar el correo de recuperación")
            }

            const data = await response.json()
            setSuccess(true)
            setEmail("")

            // Cerrar el modal después de 3 segundos
            setTimeout(() => {
                handleClose(false)
            }, 3000)
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error al enviar el correo")
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = (isOpen: boolean) => {
        if (!isOpen) {
            setEmail("")
            setError(null)
            setSuccess(false)
            setEmailError(false)
        }
        onOpenChange(isOpen)
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="bg-[#056F94] text-primary-foreground -m-6 mb-0 p-6 rounded-t-lg">
                    <DialogTitle className="flex items-center gap-2 text-lg">
                        <KeyRound className="h-5 w-5" />
                        Recuperar Contraseña
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="pt-6">
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {success && (
                        <Alert className="mb-4 border-green-500 bg-green-50">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">
                                Si el correo existe, recibirás un email con tu contraseña temporal.
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email-recovery">
                                Correo Electrónico <span className="text-destructive">*</span>
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email-recovery"
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`pl-10 ${emailError ? "border-destructive" : ""}`}
                                    disabled={isLoading || success}
                                />
                            </div>
                            {emailError && (
                                <p className="text-sm text-destructive">Ingresa un email válido.</p>
                            )}
                            <p className="text-sm text-muted-foreground">
                                Ingresa tu correo y te enviaremos una contraseña temporal.
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="mt-6 border-t pt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            className="bg-[#ff0707] hover:bg-[#790000] text-white cursor-pointer"
                            onClick={() => handleClose(false)}
                            disabled={isLoading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="bg-[#54b413] hover:bg-[#3c810e] text-white font-semibold cursor-pointer"
                            disabled={isLoading || success}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Enviar
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}