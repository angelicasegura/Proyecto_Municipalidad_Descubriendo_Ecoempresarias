import { createContext, useContext, useEffect, useState} from "react"
import type {ReactNode} from "react"
/* Tipos Roles */

export interface User {
  id: number
  nombre: string
  rol: "Admin" | "EMPRENDEDOR" | "USUARIO"
}

interface AuthContextType {
  user: User | null
  login: (token: string) => void
  logout: () => void
  loading: boolean
}



/*  Context  */

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/*  Provider  */

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setLoading(false)
      return
    }

    fetch(`https://localhost:7050/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Token inválido")
        return res.json()
      })
      .then(userFromApi => {
        setUser(userFromApi)
      })
      .catch(() => {
        localStorage.removeItem("token")
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (token: string) => {
  localStorage.setItem("token", token)

  const res = await fetch("http://localhost:7050/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) throw new Error("Login inválido")

  const userFromApi = await res.json()
  setUser(userFromApi)
}

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}


/*  Hook  */

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider")
  }
  return context
}
