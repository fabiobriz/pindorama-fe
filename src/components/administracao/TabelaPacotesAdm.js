import React, { useEffect, useState } from 'react';
import { buscarClientes } from '../../services/cliente.service';
import ModalAdm from './ModalAdm';


function TabelaPacotesAdm() {

    const [clientes, setClientes] = useState();
    const [title, setTitle] = useState('');
    const [idPacote, setIdPacote] = useState();
    const [idCliente, setIdCliente] = useState();

    useEffect(() => {
        if (clientes === undefined) {
            async function fetchData() {
                setClientes(await buscarClientes());
            }
            fetchData();
        }
    }, [clientes]);

    function callModal(idItem, idCliente,title) {
        setIdPacote(idItem);
        setIdCliente(idCliente);
        setTitle(title);
    }

    return (
        <>
            <ModalAdm id={idPacote} idcl={idCliente} title={title} />
            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Aldeia</th>
                        <th>Valor</th>
                        <th>Data Ida</th>
                        <th>Data Volta</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes && (
                        clientes.map(cliente => (
                            <>
                            {cliente.pacotes.map(pacote => (
                                <tr key={pacote.id}>
                                    <td> {cliente.nome} </td>
                                    <td>{pacote.aldeia.nome}</td>
                                    <td> {pacote.valor} </td>
                                    <td>{new Intl.DateTimeFormat({ day: 'numeric', month: 'long', year: 'numeric' }).format(Date.parse(pacote.dataIda.substr(0, 10)))}</td>
                                    <td>{new Intl.DateTimeFormat({ day: 'numeric', month: 'long', year: 'numeric' }).format(Date.parse(pacote.dataVolta.substr(0, 10)))}</td>
                                    <td>
                                       
                                        <button type="button" className="btn btn-sm btn-outline-warning m-1" data-bs-toggle="modal" data-bs-target="#ModalAdm" onClick={(e) => callModal(pacote.id, cliente.id,"Cancelar Pacote")}>
                                            <img src="img/delete.png" alt="delete" />
                                        </button>
                                    </td>
                                </tr>
                                ))}
                            </>
                        ))
                    )}
                </tbody>
            </table>
        </>
    )
}

export default TabelaPacotesAdm