export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha?: string;       // opcional para não expor sempre
  telefones?: string[];
}
