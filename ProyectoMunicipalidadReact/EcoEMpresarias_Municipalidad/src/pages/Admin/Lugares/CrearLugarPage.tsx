import { useState, useEffect } from "react";
import { crearLugar } from "./actions/crearLugar";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "../../../components/ui/alert";

export default function CrearLugarPage() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [distrito, setDistrito] = useState("");
  const [detalles, setDetalles] = useState("");

  const [alerta, setAlerta] = useState<{
    tipo: "success" | "error";
    mensaje: string;
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    if (alerta) {
      const timer = setTimeout(() => {
        setAlerta(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alerta]);
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!nombre.trim()) newErrors.nombre = "El nombre es obligatorio";

    if (!provincia.trim()) newErrors.provincia = "La provincia es obligatoria";

    if (!canton.trim()) newErrors.canton = "El cantón es obligatorio";

    if (!distrito.trim()) newErrors.distrito = "El distrito es obligatorio";

    if (!detalles.trim()) newErrors.detalles = "Los detalles son obligatorios";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await crearLugar({
        nombre,
        provincia,
        canton,
        distrito,
        detalles,
        estado_id: 1,
      });

      setAlerta({
        tipo: "success",
        mensaje: "Lugar creado correctamente",
      });

      setNombre("");
      setProvincia("");
      setCanton("");
      setDistrito("");
      setDetalles("");

      setTimeout(() => {
        navigate("/admin/lugares");
      }, 2000);
    } catch (error) {
      console.error(error);

      setAlerta({
        tipo: "error",
        mensaje: "Error creando el lugar",
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Crear Lugar</h1>

      {alerta && (
        <Alert
          variant={alerta.tipo === "error" ? "destructive" : "default"}
          className="mb-4"
        >
          <AlertTitle>
            {alerta.tipo === "success" ? "Éxito" : "Error"}
          </AlertTitle>

          <AlertDescription>{alerta.mensaje}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block text-sm font-medium">Nombre del lugar:</label>

        <input
          className={`w-full border p-2 rounded ${
            errors.nombre ? "border-red-500" : ""
          }`}
          value={nombre}
          onChange={(e) => {
            setNombre(e.target.value);
            if (errors.nombre) {
              setErrors({ ...errors, nombre: "" });
            }
          }}
        />

        {errors.nombre && (
          <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
        )}

        <label className="block text-sm font-medium">Provincia:</label>

        <input
          className={`w-full border p-2 rounded ${
            errors.provincia ? "border-red-500" : ""
          }`}
          value={provincia}
          onChange={(e) => {
            setProvincia(e.target.value);
            if (errors.provincia) {
              setErrors({ ...errors, provincia: "" });
            }
          }}
        />

        {errors.provincia && (
          <p className="text-red-500 text-sm mt-1">{errors.provincia}</p>
        )}
        <label className="block text-sm font-medium">Cantón:</label>

        <input
          className={`w-full border p-2 rounded ${
            errors.canton ? "border-red-500" : ""
          }`}
          value={canton}
          onChange={(e) => {
            setCanton(e.target.value);
            if (errors.canton) {
              setErrors({ ...errors, canton: "" });
            }
          }}
        />

        {errors.canton && (
          <p className="text-red-500 text-sm mt-1">{errors.canton}</p>
        )}

        <label className="block text-sm font-medium">Distrito:</label>

        <input
          className={`w-full border p-2 rounded ${
            errors.distrito ? "border-red-500" : ""
          }`}
          value={distrito}
          onChange={(e) => {
            setDistrito(e.target.value);
            if (errors.distrito) {
              setErrors({ ...errors, distrito: "" });
            }
          }}
        />

        {errors.distrito && (
          <p className="text-red-500 text-sm mt-1">{errors.distrito}</p>
        )}

        <label className="block text-sm font-medium">Detalles:</label>

        <textarea
          className={`w-full border p-2 rounded ${
            errors.detalles ? "border-red-500" : ""
          }`}
          value={detalles}
          onChange={(e) => {
            setDetalles(e.target.value);
            if (errors.detalles) {
              setErrors({ ...errors, detalles: "" });
            }
          }}
        />

        {errors.detalles && (
          <p className="text-red-500 text-sm mt-1">{errors.detalles}</p>
        )}

        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 transition"
          >
            Crear Lugar
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/lugares")}
            className="bg-gray-400 text-white px-4 py-2 rounded w-full hover:bg-gray-500 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
