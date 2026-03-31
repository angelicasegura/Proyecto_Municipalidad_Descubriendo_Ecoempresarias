export interface DetalleFactura {
  factura_id: number;
  producto_id: string;
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Factura {
  factura_id: number;
  fecha: string;
  subtotal: number;
  iva: number;
  total: number;
  usuario_id: number;
  emprendimiento_id: number;
  estado_id: number;
  detalles: DetalleFactura[];
}

export interface Pedido {
  pedido_id: string;
  fechaPedido: string;
  estado_id: number;
  direccionEntrega: string;
  observaciones: string;
  factura_id: number;
  factura: Factura;
}

export interface PedidosResponse {
  items: Pedido[];
  totalCount: number;
}