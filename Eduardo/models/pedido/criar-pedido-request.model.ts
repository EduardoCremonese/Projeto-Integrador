export interface CriarPedidoRequest {
  usuarioId: number;
  itens: {
    produtoId: number;
    quantidade: number;
  }[];
  enderecoId?: number;   // se precisar associar endereço de entrega
}
