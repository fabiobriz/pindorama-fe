import React, { useState, useEffect } from "react";
import { buscarAldeiaIdUser } from "../../services/aldeia.service";
import { getCurrentUser } from "../../services/auth.service";
import ModalAldeia from "./ModalAldeia";




function CardAldeia() {

    const [aldeia, setAldeia] = useState();
    const [user, setUser] = useState();
    const [id, setId] = useState();
    const [titulo, setTitulo] = useState();

    useEffect(() => {
        if (aldeia === undefined || user === undefined) {
            async function fetchData() {
                setUser(await getCurrentUser());
                if (user.id !== null && user.roles.includes("ROLE_ALDEIA")) {
                    setAldeia(await buscarAldeiaIdUser(user.id));
                }
            }
            fetchData();
        }

    }, [aldeia, user]);

    function callModal(id, title) {
        setId(id);
        setTitulo(title);
    }

    return (

        <div className="row colorPadrao2 justify-content-center text-break text-center rounded py-3" >
            <ModalAldeia id={id} titulo={titulo} />
            <h1>Dados da Aldeia</h1>

            {aldeia && (
                <div className="col-7 col-lg-8">
                    {aldeia.id && (
                        <div className="card p-0 colorPadrao rounded">

                            <img className="mx-auto p-0 m-0" src="/img/perfil-de-usuario.png" alt="Imagem de capa do card" id="user" />
                            <hr className="text-white" />
                            <div className="card-body text-start">
                                <h3 className="card-title text-center text-white">{aldeia.nome.toUpperCase()}</h3>
                                <p className="card-text m-0 text-white">Responsavel: {aldeia.responsavel}</p>
                                <p className="card-text m-0 text-white">Celular: {aldeia.telefone}</p>
                                <p className="card-text m-0 text-white">Endereço: {aldeia.endereco.estado + ", " + aldeia.endereco.cidade + ", " + aldeia.endereco.bairro + ", " + aldeia.endereco.logradouro + ", " + aldeia.endereco.numero + ", " + aldeia.endereco.complemento}</p>
                            </div>
                            <div className="card-body colorBlue">
                                <button type="button" className="btn btn-sm colorPadrao btn-outline-warning mx-3 w-25" onClick={(e) => { callModal(aldeia.id, "Alterar Dados") }} data-bs-toggle="modal" data-bs-target="#ModalAl">
                                    <img src="/img/edit.png" alt="edit" className="w-50 h-50 my-auto" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div >
    );

}

export default CardAldeia