import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/imagens/";

export const buscarImagens = async() => {
    return (await axios.get(API_URL,
        {headers: authHeader()}
    )).data;
}
export const buscarImagem = async(id) => {
    return (await axios.get(API_URL + id,
        {headers: authHeader()}
    )).data;
}



export const updateImagem = async(id, nome, dados) => {
    var img = {nome, dados};
    await axios.put(API_URL + id, img,{
        headers: authHeader()
    });
}

export const deleteImagem = async(id) => {
    await axios.delete(API_URL + id,{
        headers: authHeader()
        }
    );
}

