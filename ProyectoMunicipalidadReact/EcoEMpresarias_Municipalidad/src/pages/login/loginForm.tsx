import { useState } from "react";
export default function LoginForm() {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!correo || !contrasena) {
            setError("Por favor, complete todos los campos.");
            return;
        }
        console.log("Correo:", correo);
        console.log("Contraseña:", contrasena);
    };
    return (

        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Correo</label>
                <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
                <label className="flex flex-col gap-1">Contraseña</label>
                <input
                    type="password"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="flex flex-col gap-1">
                <button type="submit" className="w-full bg-blue-600  text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">Iniciar Sesión</button>

            </div>



            <div className="text-center mt-4">
                <a href="#" className="text-sm text-black-600 hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
            <div className="text-center mt-4">
                <a href="#" className=" text-blue-600 text-sm hover:underline">Crear Cuenta</a>
            </div>

        </form>
    );
}