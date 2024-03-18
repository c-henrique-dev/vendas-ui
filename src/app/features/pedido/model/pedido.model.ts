import { Item } from "../../item/model/item.model";

export interface Pedido {
    id?: number;
    usuario: number;
    formaDePagamento: string;
    parcelas: number;
    itens: Item[]
}