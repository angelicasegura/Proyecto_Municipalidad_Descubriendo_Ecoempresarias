import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import type { Inventario } from "../../../types/productosType";
import { handleFetchInventarioEmprendimiento } from "./Actions/handleFetchInventarioEMprendimeinto";


export default function InventarioEmprendimiento() {

    const { id, cedulaJuridica } = useParams<{ id: string; cedulaJuridica: string }>();
    const [inventario, setInventario] = useState<Inventario[]>([]);
    const numericId = useMemo(() => Number(id) || null, [id]);

    useEffect(() => {
        if (!numericId || !cedulaJuridica) return;
        const loadInventario = async () => {
            try {
                const inventarioData = await handleFetchInventarioEmprendimiento(numericId.toString(), cedulaJuridica);
                setInventario(inventarioData);
            } catch (err) {
                console.error("Error cargando inventario:", err);
            }
        };
        loadInventario();
    }, [numericId, cedulaJuridica]);


    console.log("Inventario obtenido:", inventario);
    return (
        <div>
            <h1>Inventario Emprendimiento</h1>
            <p>Hola desde el componente de inventario</p>
        </div>
    );
}