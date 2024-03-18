import { ItemSalvar } from "../../item/model/item-salvar.model";

export interface PedidoSalvar {
    usuario: number;
    formaDePagamento: string;
    parcelas: number;
    itens: ItemSalvar[]
}