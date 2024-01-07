import { Estoque } from "./estoque.model";

export interface Produto {
    id?: number;
    descricao: string;
    precoUnitario: number;
    nomeImagem?: string;
    estoque: Estoque
}