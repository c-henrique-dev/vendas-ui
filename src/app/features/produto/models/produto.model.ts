import { Estoque } from './estoque.model';

export interface Produto {
  id?: number;
  nomeProduto: string;
  descricao: string;
  precoUnitario: number;
  nomeImagem?: string;
  estoque: Estoque;
}
