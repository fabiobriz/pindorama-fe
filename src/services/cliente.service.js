import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "https://pindorama-be.herokuapp.com/clientes/";

export const buscarClientes = async() => {
    return (await axios.get(API_URL,
        {headers: authHeader()}
    )).data;
}

export const buscarCliente = async(id) => {
    return (await axios.get(API_URL + id,
        {headers: authHeader()}
    )).data;
}

export const buscarClienteIdUser = async(userId) => {
    return (await axios.get(API_URL + "user/" + userId,
        {headers: authHeader()})).data;
}

export const createCliente = async (nome, telefone, dataNascimento, cpf, endereco, user) => {
    var cliente = {nome, telefone, dataNascimento, cpf, endereco, user};
     await axios.post(API_URL, cliente, {
        headers: authHeader()
    });
}

export const updateCliente = async(id, nome, telefone, dataNascimento, cpf, endereco, artesanatos, pacotes) => {
    var dados = {nome, telefone, dataNascimento, cpf, endereco, artesanatos, pacotes};
    await axios.put(API_URL + id, dados,{
        headers: authHeader()
    });
}


export const deleteCliente = async(id) => {
    await axios.delete(API_URL + id,{
        headers: authHeader()
    }
    );
}

export const comprarPacote = async(id, pacote) => {
await axios.put(API_URL+"comprarPct/" + id, pacote,{
    headers: authHeader()
    });
}

export const comprarArtesanato = async(id, artesanato) => {
    await axios.put(API_URL+"comprarArt/" + id, artesanato,{
        headers: authHeader()
    });
}

export const cancelarPacote = async(id, pacote) => {
    await axios.put(API_URL+"cancelarPct/" + id, pacote, {
        headers: authHeader()
    });
}

export const cancelarArtesanato = async(id, artesanato) => {
    await axios.put(API_URL+"cancelarArt/" + id, artesanato, {
        headers: authHeader()
    });
}


