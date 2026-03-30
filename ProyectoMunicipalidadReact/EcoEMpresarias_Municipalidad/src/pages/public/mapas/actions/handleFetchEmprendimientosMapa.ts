import type { Emprendimiento } from "../../../../types/emprendedoresType";

export async function handleFetchEmprendimientosMapa(): Promise<Emprendimiento[]> {
  const res = await fetch(
    "http://localhost:7050/api/Emprendimientos/paginados?page=1&limit=100",
    { cache: "no-store" } // útil en Next para evitar cache raro en dev
  );

  if (!res.ok) {
    throw new Error(`Error al obtener emprendimientos: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data?.items ?? data;
}