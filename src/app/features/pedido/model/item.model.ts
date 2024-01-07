import { Produto } from '../../produto/models/produto.model';

export interface Item {
  produto: Produto;
  quantidade: number;
}
