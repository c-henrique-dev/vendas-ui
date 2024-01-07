import { Item } from "./item.model";

export interface Pedido {
    usuario: number;
    formaDePagamento: string;
    parcelas: number;
    itens: Item[]
}