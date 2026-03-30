export interface Evento {
  evento_id: number
  nombreEvento: string
  descripcion: string
  fecha_inicio: string
  fecha_Final: string
  horario: string
  cupos: number
  cupos_actuales: number
  lugar_id: number
  estado_id: number
}

export async function fetchEventos(): Promise<Evento[]> {

  const res = await fetch(
    "https://localhost:7050/api/Evento/ObtenerEventos"
  )

  if (!res.ok) {
    throw new Error("Error cargando eventos")
  }

  return res.json()
}
