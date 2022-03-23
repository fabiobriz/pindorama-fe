import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/auth.service";
import { buscarClienteIdUser } from "../../services/cliente.service";
import ModalCliente from "./ModalCliente";

function TabelaPacotesCl() {

    const [cliente, setCliente] = useState();
    const [id, setId] = useState();
    const [titulo, setTitulo] = useState();

    useEffect(() => {
        if (cliente === undefined) {
            async function fetchData() {
                const user = getCurrentUser();
                if (user.id !== null && user.roles.includes("ROLE_CLIENTE")) {
                    setCliente(await buscarClienteIdUser(user.id));
                }
            }
            fetchData();
        }
    }, [cliente]);

    function CancelarPacote(id, title) {
        setId(id);
        setTitulo(title);
    }

    return (
        <>
            <ModalCliente id={id} titulo={titulo} />


            <h1>Pacotes do Cliente</h1>

            <table className="table mt-2">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Nascimento</th>
                        <th>CPF</th>
                        <th>Origem</th>
                        <th>Destino</th>
                        <th>Valor</th>
                        <th>Data de Inicio</th>
                        <th>Data de Fim</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {cliente && (
                        <>
                            {cliente.pacotes && (
                                cliente.pacotes.map(pacote => (
                                    <tr>
                                        <td>{cliente.nome}</td>
                                        <td>{new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(Date.parse(cliente.dataNascimento.substr(0, 10)))}</td>
                                        <td>{cliente.cpf}</td>
                                        <td>{cliente.endereco.estado + ", " + cliente.endereco.cidade}</td>
                                        <td>{pacote.aldeia.nome}</td>
                                        <td>{pacote.valor}</td>
                                        <td>{new Intl.DateTimeFormat({ day: 'numeric', month: 'long', year: 'numeric' }).format(Date.parse(pacote.dataIda.substr(0, 10)))}</td>
                                        <td>{new Intl.DateTimeFormat({ day: 'numeric', month: 'long', year: 'numeric' }).format(Date.parse(pacote.dataVolta.substr(0, 10)))}</td>
                                        <td>
                                        <button type="button" className="btn btn-sm colorPadrao btn-outline-warning mx-3" onClick={(e) => { CancelarPacote(pacote.id, "Cancelar Pacote") }} data-bs-toggle="modal" data-bs-target="#ModalCl" >
                                                <img src="/img/delete.png" alt="delete"/>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default TabelaPacotesCl