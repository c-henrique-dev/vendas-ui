import { ItemSalvar } from "./item-salvar.model";

export interface PedidoSalvar {
    usuario: number;
    formaDePagamento: string;
    parcelas: number;
    itens: ItemSalvar[]
}