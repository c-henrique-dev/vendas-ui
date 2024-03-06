import { Produto } from "../../produto/models/produto.model"

export interface Carrinho {
    id: number
    produto: Produto[]
    quantidade: number;
}