import React, { useState, useEffect } from "react";
import { buscarAldeiaIdUser } from "../../../services/aldeia.service";
import { buscarByAldeia } from "../../../services/artesanato.service";
import { getCurrentUser } from "../../../services/auth.service";
import ModalAldeia from "../ModalAldeia";


function TabelaArtesanatosAl() {
    const [artesanatos, setArtesanatos] = useState();
    const [aldeia, setAldeia] = useState();
    const [id, setId] = useState();
    const [titulo, setTitulo] = useState();

    useEffect(() => {
        if (artesanatos === undefined) {
            async function fetchData() {
                const user = await getCurrentUser();
                if (user.id !== null && user.roles.includes("ROLE_ALDEIA")) {
                    setAldeia(await buscarAldeiaIdUser(user.id));
                    if (aldeia !== undefined && aldeia !== null) {
                        setArtesanatos(await buscarByAldeia(aldeia.id));
                    }
                }
            }
            fetchData();
        }
    }, [aldeia, artesanatos]);

    function callModal(id, title) {
        setId(id);
        setTitulo(title)
    }

    return (
        <>
            <ModalAldeia id={id} titulo={titulo} />
            <h1>Aldeia - Artesanatos</h1>

            <table className="table mt-2 text-break text-center">
                <thead>
                    <tr>
                        <th>
                            Nome
                        </th>
                        <th>
                            Descrição
                        </th>
                        <th>
                            Valor
                        </th>
                        <th>
                            Imagem
                        </th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {artesanatos && (
                        artesanatos.map(artesanato => (
                            <tr key={artesanato.id}>
                                <td>
                                    {artesanato.nome}
                                </td>
                                <td className="col-6 col-sm-6 col-md-6 col-lg-6">
                                    {artesanato.descricao}
                                </td>
                                <td>
                                    {artesanato.valor}
                                </td>
                                <td>
                                {artesanato.imagem &&(
                                    <img src={`data:${artesanato.mime_type};base64,${artesanato.imagem.dados}`} width="50" height="50" alt="imgPacote" />
                                    )}
                                </td>
                                <td>
                                    <button type="button" className="btn btn-sm colorPadrao btn-outline-warning  m-1" onClick={(e) => { callModal(artesanato.id, "Alterar Artesanato") }} data-bs-toggle="modal" data-bs-target="#ModalAl" >
                                        <img src="/img/edit.png" alt="update" />
                                    </button>
                                    <button type="button" className="btn btn-sm colorPadrao btn-outline-warning  m-1" onClick={(e) => { callModal(artesanato.id, "Apagar Artesanato") }} data-bs-toggle="modal" data-bs-target="#ModalAl" >
                                        <img src="/img/delete.png" alt="delete" />
                                    </button>
                                    <button type="button" className="btn btn-sm colorPadrao btn-outline-warning  m-1" onClick={(e) => { callModal(artesanato.id, "Imagem Artesanato") }} data-bs-toggle="modal" data-bs-target="#ModalAl" >
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
                    <button className="btn w-100 btn-md text-white colorPadrao btn-outline-warning" onClick={(e) => { callModal(aldeia.id, "Cadastro Artesanato") }} data-bs-toggle="modal" data-bs-target="#ModalAl">
                        Cadastrar Artesanato
                    </button>
                )}
            </div>
        </>
    );
}

export default TabelaArtesanatosAl