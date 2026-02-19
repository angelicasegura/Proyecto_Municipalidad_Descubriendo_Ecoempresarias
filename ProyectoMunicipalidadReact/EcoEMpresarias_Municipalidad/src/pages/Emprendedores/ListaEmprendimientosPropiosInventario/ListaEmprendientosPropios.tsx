import { authFetch } from "../../../auth/AuthFetch";
import { useQuery } from "@tanstack/react-query";
import {
  type Emprendedor,
  fetchTiposActividad,
  type TipoActividad,
} from "../../../types/emprendedoresType";
import { useEffect, useState } from "react";
import { BannerDeSeccionInventario } from "./components/BannerDeSeccionInventario";
import { EmprendimientosGrid } from "./components/emprendimientoCardsGrid";

export default function EmprendimientosPropios() {
  const [emprendedores, setEmprendedores] = useState<Emprendedor[]>([]);
  const [tiposActividad, setTiposActividad] = useState<TipoActividad[]>([]);
  

  
  const { data: usuario } = useQuery({
    queryKey: ["usuario"],
    queryFn: async () => {
      const res = await authFetch("https://localhost:7050/auth/me");
      return res.json();
    },
  });
  const { data: emprendedoresData } = useQuery({
    queryKey: ["emprendedores", usuario?.id],
    queryFn: async () => {
      if (!usuario?.id) return [];
      const res = await authFetch(
        `https://localhost:7050/api/emprendimientos/Obtener/Cedula?cedula=${usuario.id}`,
      );
      return res.json();
    },
    enabled: !!usuario?.id, 
    refetchInterval: 180000,
    gcTime: Infinity,
  });
  useEffect(() => {
       fetchTiposActividad().then((data) => setTiposActividad(data));
     }, []);
  useEffect(() => {
  if (emprendedoresData) {
    setEmprendedores(emprendedoresData); 
  }
}, [emprendedoresData]);


  console.log("Emprendedores obtenidos:", emprendedoresData);
  return (
    <>
    
      <BannerDeSeccionInventario />
      <EmprendimientosGrid
        emprendedores={emprendedores}
        tiposActividad={tiposActividad}
      />
    </>
  );
}
