import React, { useEffect, useState } from 'react';
import { buscarClientes } from '../../services/cliente.service';
import ModalAdm from './ModalAdm';


function TabelaArtesanatosAdm() {

    const [clientes, setClientes] = useState();
    const [title, setTitle] = useState('');
    const [idArtesanato, setIdArtesanato] = useState();
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
        setIdArtesanato(idItem);
        setIdCliente(idCliente);
        setTitle(title);
    }

    return (
        <>
            <ModalAdm id={idArtesanato} idcl={idCliente} title={title} />
            <table className="table">
                <thead>
                    <tr>
                        <th>Nome Cliente</th>
                        <th>Nome do Artesanato</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes && (
                        clientes.map(cliente => (
                            <>
                                {cliente.artesanatos.map(artesanato => (
                                    <tr key={artesanato.id}>
                                        <td>{cliente.nome}</td>
                                        <td>{artesanato.nome}</td>
                                        <td>{artesanato.valor}</td>
                                        <td>
                                            

                                            <button type="button" className="btn btn-sm btn-outline-warning m-1" data-bs-toggle="modal" data-bs-target="#ModalAdm" onClick={(e) => callModal(artesanato.id, cliente.id, "Cancelar Artesanato")}>
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

export default TabelaArtesanatosAdm