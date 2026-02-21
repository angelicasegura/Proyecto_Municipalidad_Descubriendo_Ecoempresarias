// src/main.tsx (o index.tsx)
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "../src/css/styles.css"
import { AuthProvider } from "./auth/AuthContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from "./App"
import { NavigationProvider } from "./context/NavigationContext" 

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NavigationProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </AuthProvider>
      </NavigationProvider>
    </BrowserRouter>
  </StrictMode>
)

