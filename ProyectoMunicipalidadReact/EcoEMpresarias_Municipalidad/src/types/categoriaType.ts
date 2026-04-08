import { authFetch } from "../auth/AuthFetch";
import { Navbar } from '../components/ui/layout/navbar';

export interface Categoria {
    Categoria_id: string
    Nombre: string
    estado: number
}

const BASE_URL = "https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net"

export async function obtenerCategorias(): Promise<Categoria[]> {
    const res = await authFetch(`${BASE_URL}/api/CategoriasProductos/Obtener`)
    if (!res.ok) throw new Error("Error al obtener categorías")
    return res.json()
}
