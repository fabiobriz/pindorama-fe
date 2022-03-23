import axios from 'axios'
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/user/";


export const alterarUser = async(id,username ,email, password) => {
    var user = [username, email, password];
    return (await axios.put(API_URL + id, user, {headers: authHeader()})).data;
}

export const excluirUser = async(id) => {
    await axios.delete(API_URL + id, {
        headers: authHeader()});
}