import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "https://pindorama-be.herokuapp.com/contatos/";

export const buscarMensagens = async() => {
    return (await axios.get(API_URL,
        {headers: authHeader()}
    )).data;
}
export const buscarMensagem = async(id) => {
    return (await axios.get(API_URL + id,
        {headers: authHeader()}
    )).data;
}

export const createMensagem = async(nome, email, mensagem) => {
    var dados = {nome, email, mensagem};
    await axios.post(API_URL+"create", dados);
}

export const updateMensagem = async(id, nome, email, mensagem) => {
    var dados = {nome, email, mensagem};
    await axios.put(API_URL+ id, dados,{
        headers: authHeader()
    });
}

export const deleteMensagem = async(id) => {
    await axios.delete(API_URL+id,{
        headers: authHeader()
        }
    );
}

