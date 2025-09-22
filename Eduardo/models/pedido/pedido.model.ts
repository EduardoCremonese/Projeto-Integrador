export interface Pedido {
  id: number;
  usuarioId: number;
  enderecoId: number;
  itens: PedidoItem[];
  status: string;
  dataCriacao: string;
}

export interface PedidoItem {
  produtoId: number;
  quantidade: number;
}
