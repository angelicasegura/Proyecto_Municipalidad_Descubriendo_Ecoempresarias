import { type FC, useState } from "react";
import { type PedidoResponse } from "../../../../../types/pedidoType";
import {  Card, CardContent, CardFooter } from "../../../../../components/ui/card";
import { FacturaModal } from "./facturaModal";
import { handleCancelarPedido} from "../Actions/handleCancelarPedido";
import { handleActualizarPedido } from "../Actions/handleActualizarEstadoPedido";
import {Button} from "../../../../../components/ui/button"
interface PedidoCardProps {
    pedido: PedidoResponse;
    onUpdate: () => void;
}

export const PedidoCard: FC<PedidoCardProps> = ({ pedido, onUpdate }) => {
    const [showFactura, setShowFactura] = useState(false);

    const handleCancelar = async () => {
        const descripcion = prompt("Motivo de cancelación del pedido") || "";
        await handleCancelarPedido(pedido.pedidoId, descripcion);
        onUpdate();
    };

    const handleActualizar = async () => {
        await handleActualizarPedido(Number(pedido.pedidoId));
        onUpdate();
    };

    return (
        <Card className="mb-4">
            <CardContent>
                <p><strong>Pedido:</strong> {pedido.pedidoId}</p>
                <p><strong>Fecha:</strong> {new Date(pedido.fechaPedido).toLocaleString()}</p>
                <p><strong>Dirección:</strong> {pedido.direccionEntrega}</p>
                {pedido.observaciones && <p><strong>Observaciones:</strong> {pedido.observaciones}</p>}
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowFactura(true)}>Ver Factura</Button>
                    <Button variant="secondary" onClick={handleActualizar}>Actualizar</Button>
                    {pedido.estadoId === 5 && (
                        <Button variant="destructive" onClick={handleCancelar}>Cancelar</Button>
                    )}
                </div>
            </CardFooter>
            {showFactura && pedido.factura && (
                <FacturaModal factura={pedido.factura} onClose={() => setShowFactura(false)} />
            )}
        </Card>
    );
};