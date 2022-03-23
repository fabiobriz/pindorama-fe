import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../../services/auth.service";
import { buscarClienteIdUser } from "../../services/cliente.service";
import ModalCliente from "./ModalCliente";

function CardCliente() {

    const [cliente, setCliente] = useState();
    const [user, setUser] = useState();
    const [id, setId] = useState();
    const [titulo, setTitulo] = useState();

    useEffect(() => {
        if (cliente === undefined || user === undefined) {
            async function fetchData() {
                setUser(await getCurrentUser());
                if (user.id !== null && user.roles.includes("ROLE_CLIENTE")) {
                    setCliente(await buscarClienteIdUser(user.id));
                }
            }
            fetchData();
        }
    }, [cliente, user]);

    function callModal(id, title) {
        setId(id);
        setTitulo(title);
    }

    return (

        <div className="row colorPadrao2 justify-content-center text-break text-center rounded py-3" >
            <ModalCliente id={id} titulo={titulo} />
            <h1>Dados da Pessoais</h1>

            {(cliente !== undefined) && (
                <div className="col-7 col-lg-8">
                    {cliente.id && (
                    <div className="card p-0 colorPadrao rounded">
                        <img className="mx-auto p-0 m-0" src="/img/perfil-de-usuario.png" alt="Imagem de capa do card" id="user" />
                        <hr className="text-white" />
                        <div className="card-body text-start">
                            <h3 className="card-title text-center text-white">{cliente.nome.toUpperCase()}</h3>
                            <p className="card-text m-0 text-white">Nascimento: {new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(Date.parse(cliente.dataNascimento.substr(0, 10)))}</p>
                            <p className="card-text m-0 text-white">CPF: {cliente.cpf}</p>
                            <p className="card-text m-0 text-white">Celular: {cliente.telefone}</p>
                            <>
                                <p className="card-text m-0 text-white">Endereço: {cliente.endereco.estado + ", " + cliente.endereco.cidade + ", " + cliente.endereco.bairro + ", " + cliente.endereco.logradouro + ", " + cliente.endereco.numero + ", " + cliente.endereco.complemento}</p>
                            </>
                        </div>
                        <div className="card-body">
                            <button type="button" className="btn btn-sm colorPadrao btn-outline-warning" onClick={(e) => { callModal(cliente.id, "Alterar Dados") }} data-bs-toggle="modal" data-bs-target="#ModalCl">
                                <img src="/img/edit.png" alt="edit" className="my-auto" id="imgcontato"/>
                            </button>
                        </div>
                    </div>
                    )}
                </div>
            )}
        </div >
    );
}

export default CardCliente