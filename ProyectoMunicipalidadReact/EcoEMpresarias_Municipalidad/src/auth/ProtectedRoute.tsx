import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import {PageLoader } from "../components/ui/layout/pageLoader"

interface ProtectedRouteProps {
  allowedRoles?: Array<"ADMIN" | "EMPRENDEDOR" | "USUARIO">
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth()

  //  Mientras valida sesión
  if (loading) {
    return <PageLoader />
  }

  //  No logueado
  if (!user) {
    return <Navigate to="/login" replace />
  }

  //  Rol no autorizado
  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/403" replace />
  }

  // Todo bien
  return <Outlet />
}

