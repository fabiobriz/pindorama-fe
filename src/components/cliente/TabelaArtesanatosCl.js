import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/auth.service";
import { buscarClienteIdUser } from "../../services/cliente.service";
import ModalCliente from "./ModalCliente";

function TabelaArtesanatosCl() {

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

    function CancelarArtesanato(id, title) {
        setId(id);
        setTitulo(title);
    }


    return (
        <>
            <ModalCliente id={id} titulo={titulo} />

            <h1>Artesanatos do Cliente</h1>

            <table className="table mt-2">
                <thead>
                    <tr>
                        <th>
                            Nome
                        </th>
                        <th>
                            Endereço
                        </th>
                        <th>
                            Tipo
                        </th>
                        <th>
                            Descrição
                        </th>
                        <th>
                            Valor
                        </th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {cliente && (
                        cliente.artesanatos && (
                            cliente.artesanatos.map(artesanato => (
                                artesanato && (

                                    <tr>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.endereco.estado + ", " + cliente.endereco.cidade}</td>
                                        <td>{artesanato.nome}</td>
                                        <td className="col-5 col-sm-5 col-md-5 col-lg-5">
                                            {artesanato.descricao}
                                        </td>
                                        <td>{artesanato.valor}</td>
                                        <td>
                                            <button type="button" className="btn btn-sm colorPadrao btn-outline-warning mx-3" onClick={(e) => { CancelarArtesanato(artesanato.id, "Cancelar Artesanato") }} data-bs-toggle="modal" data-bs-target="#ModalCl" >
                                                <img src="/img/delete.png" alt="delete" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            ))
                        )
                    )}
                </tbody>
            </table>
        </>
    );
}

export default TabelaArtesanatosCl