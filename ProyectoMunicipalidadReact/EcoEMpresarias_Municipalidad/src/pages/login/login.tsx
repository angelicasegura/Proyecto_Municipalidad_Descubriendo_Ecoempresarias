import LoginForm from './loginForm'
import logo from "../../assets/logo.png"    

export default function Login() {
return (
    <div className = "min-h-screen flex flex-col items-center justify-center bg-white">
        <img src={logo} alt="Logo" className="mb-4 w-20 h-auto" />

        <h1 className="text-2xl font-semibold mb-6">Iniciar Sesión</h1>
       <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <LoginForm />
        </div> 
    </div>
)
}

