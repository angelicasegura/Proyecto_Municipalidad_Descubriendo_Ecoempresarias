"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Emprendimiento } from "../../../types/emprendedoresType";
import { handleFetchEmprendimientosMapa } from "./actions/handleFetchEmprendimientosMapa";
import "leaflet/dist/leaflet.css";

type MapaSeleccion = {
  nombre: string;
  descripcion: string;
  telefono: string;
  email: string;
  direccion: string;
  servicios: string[];
};

export default function MapasPage() {
  const [emprendimientos, setEmprendimientos] = useState<Emprendimiento[]>([]);
  const [selected, setSelected] = useState<MapaSeleccion | null>(null);

  // 📍 Coordenadas "quemadas" (WWMW+39 San Pedro, San José)
  const sanPedroCoords: [number, number] = [9.935, -84.0506];

  // Centro del mapa (para que se vea de una el marcador)
  const center: [number, number] = sanPedroCoords;

  // ✅ Info inventada (pin fijo)
  const emprendimientoSanPedro: MapaSeleccion = {
    nombre: "Casa Manga – Repostería & Bebidas Artesanales",
    descripcion:
      "Emprendimiento local en San Pedro especializado en postres caseros y bebidas artesanales. Trabajamos por encargo con opciones para reuniones, celebraciones y eventos pequeños.",
    telefono: "+506 8888-1234",
    email: "contacto@casamanga.cr",
    direccion: "WWMW+39, San Pedro, San José, Costa Rica",
    servicios: [
      "Postres por encargo (brownies, cheesecake, tartas)",
      "Bebidas artesanales (frappés, cafés, smoothies)",
      "Combos para cumpleaños y reuniones",
      "Entrega en el GAM (según disponibilidad)",
    ],
  };

  useEffect(() => {
    async function fetchData() {
      const data = await handleFetchEmprendimientosMapa();
      setEmprendimientos(data.filter((e) => e.estadoId === 1));
    }
    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", height: "80vh" }}>
      <MapContainer
        center={center}
        zoom={13}
        style={{ flex: 1, height: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ✅ Marker fijo "quemado" (al click llena el panel derecho) */}
        <Marker
          position={sanPedroCoords}
          eventHandlers={{
            click: () => setSelected(emprendimientoSanPedro),
          }}
        >
          <Popup>
            <b>{emprendimientoSanPedro.nombre}</b>
            <br />
            {emprendimientoSanPedro.direccion}
          </Popup>
        </Marker>

        {/* 🔸 Mientras no haya coordenadas en API, todos salen en el center */}
        {emprendimientos.map((emp) => (
          <Marker
            key={emp.emprendimientoId}
            position={center}
            eventHandlers={{
              click: () =>
                setSelected({
                  nombre: emp.nombre,
                  descripcion: emp.descripcion ?? "Sin descripción",
                  telefono: emp.telefono,
                  email: emp.email,
                  direccion: emp.direccion,
                  servicios: [
                    "Atención al cliente",
                    "Ventas por pedido",
                    "Entrega coordinada",
                  ],
                }),
            }}
          >
            <Popup>{emp.nombre}</Popup>
          </Marker>
        ))}
      </MapContainer>

      {selected && (
        <div
          style={{
            width: 350,
            padding: 20,
            background: "#f5f5f5",
            borderLeft: "1px solid #ddd",
          }}
        >
          <h2 style={{ marginTop: 0 }}>{selected.nombre}</h2>

          <p style={{ marginBottom: 10 }}>
            <b>Descripción:</b> {selected.descripcion}
          </p>

          <p style={{ marginBottom: 10 }}>
            <b>Servicios ofrecidos:</b>
            <ul style={{ margin: "6px 0 0 18px" }}>
              {selected.servicios.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </p>

          <p style={{ marginBottom: 8 }}>
            <b>Contacto:</b>
            <br />
            <b>Tel:</b> {selected.telefono}
            <br />
            <b>Email:</b> {selected.email}
          </p>

          <p style={{ marginBottom: 0 }}>
            <b>Dirección exacta:</b> {selected.direccion}
          </p>
        </div>
      )}
    </div>
  );
}