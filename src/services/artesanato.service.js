import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/artesanatos/";

export const buscarArtesanatos = async() => {
    return (await axios.get(API_URL,
        {headers: authHeader()}
    )).data;
}
export const buscarArtesanato = async(id) => {
    return (await axios.get(API_URL + id,
        {headers: authHeader()}
    )).data;
}

export const buscarByAldeia = async(id) => {
    return (await axios.get(API_URL+"findByAldeia/"+ id,
        {headers: authHeader()}
    )).data;
}


export const updateArtesanato = async(id, nome, descricao, valor) => {
    var dados = {nome, descricao, valor};
    await axios.put(API_URL + id, dados,{
        headers: authHeader()
    });
}

export const createArtesanato = async(nome, descricao, valor, id) => {
    var dados = {nome, descricao, valor};
    await axios.post(API_URL+id, dados,{
        headers: authHeader()
    });
}

export const deleteArtesanato = async(id) => {
    await axios.delete(API_URL + id,{
        headers: authHeader()
        }
    );
}

export const addImagemArt = async(img, id) => {
    let imagem = new FormData();
    imagem.append('imagem', img);
    await axios.put(API_URL+"imagem/"+id, imagem,{
        headers: authHeader()
    });
}

