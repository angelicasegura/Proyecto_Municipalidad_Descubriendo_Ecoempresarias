

export interface PedidoRequest {
  usuarioId: number
  emprendimientoId: number
  direccionEntrega: string
  observaciones?: string
}

export interface FacturaDetalleResponse {
  productoId: string
  nombreProducto: string
  cantidad: number
  precioUnitario: number
  subtotal: number
}


export interface FacturaResponse {
  facturaId: number
  fecha: string
  subtotal: number
  iva: number
  total: number
  usuarioId: number
  emprendimientoId: number
  estadoId: number
  detalles: FacturaDetalleResponse[]
}


export interface PedidoResponse {
  pedidoId: string
  fechaPedido: string
  estadoId: number
  direccionEntrega: string
  observaciones?: string
  factura: FacturaResponse
}