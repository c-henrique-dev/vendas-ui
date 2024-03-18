import { Item } from "../../item/model/item.model";

export interface PedidoDetalhes {
    codigo: number,
    cpf: string,
    dataPedido: string,
    itens: Item[],
    nomeUsuario: string,
    status: string,
    total: number
}