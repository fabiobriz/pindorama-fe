import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/pacotes/";

export const buscarPacotes = async() => {
    return (await axios.get(API_URL,
        {headers: authHeader()}
    )).data;
}


export const buscarPacote = async(id) => {
    return (await axios.get(API_URL + id,
        {headers: authHeader()}
    )).data;
}

export const buscarByAldeia = async(id) => {
    return (await axios.get(API_URL+"findByAldeia/"+ id,
        {headers: authHeader()}
    )).data;
}


export const createPacote = async(descricao, valor, dataIda, dataVolta, id) => {
    var dados = {descricao, valor, dataIda, dataVolta};
    await axios.post(API_URL+id, dados,{
        headers: authHeader()
    });
}

export const updatePacote = async(id, descricao, valor, dataIda, dataVolta) => {
    var dados = {descricao, valor, dataIda, dataVolta};
    await axios.put(API_URL + id, dados,{
        headers: authHeader()
    });
}

export const addImagemPct = async(img, id) => {
    let imagem = new FormData();
    imagem.append('imagem', img);
    await axios.put(API_URL+"imagem/"+id, imagem,{
        headers: authHeader()
    });
}

export const deletePacote = async(id) => {
    await axios.delete(API_URL + id,{
        headers: authHeader()
        }
    );
}

