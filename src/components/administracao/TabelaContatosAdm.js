import React, { useLayoutEffect, useState } from 'react';
import { buscarMensagens } from "../../services/contato.service"
import ModalAdm from './ModalAdm';



function TabelaContatosAdm() {

    const [contatos, setContatos] = useState();
    const [title, setTitle] = useState('');
    const [idContato, setIdContato] = useState(Number);

    useLayoutEffect(() => {
        if (contatos === undefined) {
            async function fetchData() {
                setContatos(await buscarMensagens());
            }
            fetchData();
        }
    }, [contatos]);

    function callModal(id, title) {
        setIdContato(id);
        setTitle(title);
    }

    return (
        <>
            <ModalAdm id={idContato} title={title} />
            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Mensagem</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {contatos && (
                        contatos.map(contato => (
                            <tr key={contato.id}>
                                <td>{contato.nome}</td>
                                <td> {contato.email} </td>
                                <td>{contato.mensagem}  </td>
                                <td>
                                    <button type="button" className="btn btn-sm btn-outline-warning m-1" data-bs-toggle="modal" data-bs-target="#ModalAdm" onClick={(e) => callModal(contato.id, "Alterar Mensagem")}>
                                        <img src="img/edit.png" alt="editar" />
                                    </button>

                                    <button type="button" className="btn btn-sm btn-outline-warning m-1" data-bs-toggle="modal" data-bs-target="#ModalAdm" onClick={(e) => callModal(contato.id, "Apagar Mensagem")}>
                                        <img src="img/delete.png" alt="delete" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    )
}

export default TabelaContatosAdm