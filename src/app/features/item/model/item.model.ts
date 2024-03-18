import { Produto } from '../../produto/models/produto.model';

export interface Item {
  id?: number;
  produto: Produto;
  quantidade: number;
}
