import { Endereco } from "src/app/features/usuario/model/endereco.model";

export interface Usuario {
    id?: number;
    login: string;
    senha: string;
    admin: string;
    cpf: string;
    nome: string;
    endereco: Endereco;
}