export interface DetallePedido {
  productoId: number
  cantidad: number
  precioUnitario: number
}

export interface Pedido {
  pedidoId?: number
  usuarioId: number
  emprendimientoId: number
  fechaPedido?: string
  estadoPedido?: string
  direccionEntrega: string
  observaciones?: string
  total?: number
  detalles: DetallePedido[]
}