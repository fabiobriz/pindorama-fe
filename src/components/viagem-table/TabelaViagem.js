import React, { useEffect, useState } from 'react';
import ModalViagem from './ModalViagem';
import {obterViagens} from "../../net/service"

function TabelaViagem() {

    const [clientes, setClientes] = useState([]);
    const [title, setTitle] = useState('');
    const [idCliente, setIdCliente] = useState(Number);


    useEffect(() => {
        obterViagens().then((retorno)=>setClientes(retorno));
    }, [])

    function callModal(id, title) {
        setIdCliente(id);
        setTitle(title);
    }

    return (
        <>
            <ModalViagem idCliente={idCliente} title={title} />
            <div className="container w-75 colorBlue rounded py-3 text-center text-break">
                <h4 className="text-center mb-3">Viagens - BrasTravel</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>CPF</th>
                            <th>Origem</th>
                            <th>Destino</th>
                            <th>Valor</th>
                            <th>Data Ida</th>
                            <th>DataVolta</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(cliente => (
                            <tr key={cliente.id}>
                                <td>{cliente.nome}</td>
                                <td>{cliente.idade}</td>
                                <td>{cliente.cpf}</td>
                                <td>{cliente.viagem.origem}</td>
                                <td>{cliente.viagem.destino}</td>
                                <td> R$: {cliente.viagem.valor} </td>
                                <td>{cliente.viagem.data_ida} </td>
                                <td>{cliente.viagem.data_volta} </td>
                                <td>
                                    <button type="button" className="btn btn-sm btn-outline-warning m-1" data-bs-toggle="modal" data-bs-target="#ModalV" onClick={(e) => callModal(cliente.id, "Alterar")}>
                                        <img src="img/edit.png" alt="editar" />
                                    </button>

                                    <button type="button" className="btn btn-sm btn-outline-warning m-1" data-bs-toggle="modal" data-bs-target="#ModalV" onClick={(e) => callModal(cliente.id, "Detalhe")}>
                                        <img src="img/ver-detalhes.png" alt="detalhes" />
                                    </button>

                                    <button type="button" className="btn btn-sm btn-outline-warning m-1" data-bs-toggle="modal" data-bs-target="#ModalV" onClick={(e) => callModal(cliente.id, "Apagar")}>
                                        <img src="img/delete.png" alt="delete" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody >
                </table >
            </div>
        </>
    )
}


export default TabelaViagem