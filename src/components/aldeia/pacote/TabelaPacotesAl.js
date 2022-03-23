import React, { useState, useEffect } from "react";
import { buscarAldeiaIdUser } from "../../../services/aldeia.service";
import { getCurrentUser } from "../../../services/auth.service";
import { buscarByAldeia } from "../../../services/pacote.service";
import ModalAldeia from "../ModalAldeia";


function TabelaPacotesAl() {
    const [pacotes, setPacotes] = useState();
    const [aldeia, setAldeia] = useState();
    const [id, setId] = useState();
    const [titulo, setTitulo] = useState();

    useEffect(() => {
        if (pacotes === undefined) {
            async function fetchData() {
                const user = await getCurrentUser();
                if (user.id !== null && user.roles.includes("ROLE_ALDEIA")) {
                    setAldeia(await buscarAldeiaIdUser(user.id));
                    if (aldeia !== undefined && aldeia !== null) {
                        setPacotes(await buscarByAldeia(aldeia.id));
                    }
                }
            }
            fetchData();
        }
    }, [aldeia, pacotes]);

    function callModal(id, title) {
        setId(id);
        setTitulo(title)
    }

    return (
        <>
            <ModalAldeia id={id} titulo={titulo} />

            <h1>Aldeia - Pacotes</h1>
            <table className="table text-center text-break">
                <thead>
                    <tr>
                        <th>
                            Destino
                        </th>
                        <th>
                            Descrição
                        </th>
                        <th>
                            Valor
                        </th>
                        <th>
                            Data de Inicio
                        </th>
                        <th>
                            Data de Fim
                        </th>
                        <th>
                            Imagem
                        </th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>

                    {pacotes && (
                        pacotes.map(pacote => (
                            <tr key={pacote.id}>
                                <td>{aldeia.nome}</td>
                                <td className="col-5">{pacote.descricao}</td>
                                <td>{pacote.valor}</td>
                                <td>{new Intl.DateTimeFormat({ day: 'numeric', month: 'long', year: 'numeric' }).format(Date.parse(pacote.dataIda.substr(0, 10)))}</td>
                                <td>{new Intl.DateTimeFormat({ day: 'numeric', month: 'long', year: 'numeric' }).format(Date.parse(pacote.dataVolta.substr(0, 10)))}</td>
                                <td>
                                {pacote.imagem &&(
                                    <img src={`data:${pacote.mime_type};base64,${pacote.imagem.dados}`} width="50" height="50" alt="imgPacote" />
                                    )}
                                </td>
                                <td>
                                    <button type="button" className="btn btn-sm colorPadrao btn-outline-warning  m-1" onClick={(e) => { callModal(pacote.id, "Alterar Pacote") }} data-bs-toggle="modal" data-bs-target="#ModalAl" >
                                        <img src="/img/edit.png" alt="update" />
                                    </button>
                                    <button type="button" className="btn btn-sm colorPadrao btn-outline-warning  m-1" onClick={(e) => { callModal(pacote.id, "Apagar Pacote") }} data-bs-toggle="modal" data-bs-target="#ModalAl" >
                                        <img src="/img/delete.png" alt="delete" />
                                    </button>
                                    <button type="button" className="btn btn-sm colorPadrao btn-outline-warning  m-1" onClick={(e) => { callModal(pacote.id, "Imagem Pacote") }} data-bs-toggle="modal" data-bs-target="#ModalAl" >
                                        <img src="/img/image.png" alt="img" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="col-12 col-sm-10 col-md-5 col-lg-3 mb-5">
                {aldeia && (
                    <button className="btn w-100 btn-md text-white colorPadrao btn-outline-warning" onClick={(e) => { callModal(aldeia.id, "Cadastro Pacote") }} data-bs-toggle="modal" data-bs-target="#ModalAl">
                        Cadastrar Pacote
                    </button>
                )}
            </div>
        </>
    );
}

export default TabelaPacotesAl