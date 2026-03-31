const API = "https://localhost:7050/api/reporte";

export async function obtenerVentasPorSector() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/ventasPorSector`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error("Error obteniendo ventas por sector");
  }

  return await response.json();
}

export async function obtenerTopSectores() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/topSectores`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error("Error obteniendo top sectores");
  }

  return await response.json();
}

export async function obtenerCrecimiento() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/crecimiento`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error("Error obteniendo crecimiento");
  }

  return await response.json();
}

export async function obtenerActivos() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/activos`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error("Error obteniendo emprendimientos activos");
  }

  return await response.json();
}