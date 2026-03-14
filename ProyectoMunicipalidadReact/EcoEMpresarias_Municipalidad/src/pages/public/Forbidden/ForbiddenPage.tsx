import { Link } from "react-router-dom";

export default function ForbiddenPage() {
  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">403 - Sin permiso</h1>
      <p className="text-gray-600 mb-6">
        No tenés permisos para acceder a esta sección con tu rol actual.
      </p>

      <div className="flex gap-3">
        <Link className="px-4 py-2 border rounded" to="/">
          Ir al inicio
        </Link>
        <Link className="px-4 py-2 border rounded" to="/login">
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}