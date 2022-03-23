import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/aldeias/";

export const buscarAldeias = async() => {
    return (await axios.get(API_URL,
        {headers: authHeader()}
    )).data;
}
export const buscarAldeia = async(id) => {
    return (await axios.get(API_URL + id,
        {headers: authHeader()}
    )).data;
}

export const buscarAldeiaIdUser = async(userId) => {
    return (await axios.get(API_URL +"user/" + userId,
        {headers: authHeader()}
        )).data;
}


export const updateAldeia = async(id, nome, responsavel,telefone, endereco) => {
    var dados = {nome, responsavel, telefone, endereco};
    await axios.put(API_URL + id, dados,{
        headers: authHeader()
    });
}

export const createAldeia = async(nome, responsavel,telefone, endereco, user) => {
    var dados = {nome, responsavel, telefone, endereco, user};
    await axios.post(API_URL, dados,{
        headers: authHeader()
    });
}

export const deleteAldeia = async(id) => {
    await axios.delete(API_URL + id,{
        headers: authHeader()
        }
    );
}

