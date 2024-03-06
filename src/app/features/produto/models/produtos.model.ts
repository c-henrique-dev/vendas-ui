import { Estoque } from './estoque.model';

export interface Produtos {
  content: [
    {
      id?: number;
      nomeProduto: string;
      descricao: string;
      precoUnitario: number;
      nomeImagem?: string;
      estoque: Estoque;
    }
  ];

  totalElements: number;
}
