import { Endereco } from "src/app/shared/endereco/model/endereco.model";

export interface Usuario {
    id?: number;
    login: string;
    senha: string;
    admin: string;
    cpf: string;
    nome: string;
    endereco: Endereco;
}