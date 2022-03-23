/* eslint-disable jsx-a11y/no-distracting-elements */
/* eslint-disable jsx-a11y/anchor-is-valid */
import CardCompra from "../compras/CardCompra";
import React, { useEffect, useState } from 'react';
import { buscarArtesanatos } from "../../services/artesanato.service";
import ModalCompra from "../compras/ModalComprar";
import { getCurrentUser } from "../../services/auth.service";

function Artesanatos() {


    const [title, setTitle] = useState();
    const [id, setId] = useState();
    const [artesanatos, setArtesanatos] = useState();
    const [show, setShow] = useState();


    useEffect(() => {
        if (artesanatos === undefined || show === undefined) {
            async function fetchData() {
                const recebe = await getCurrentUser();
                setArtesanatos(await buscarArtesanatos());
                if (recebe !== undefined && recebe.roles.includes("ROLE_CLIENTE")) {
                    setShow(true);
                } else {
                    setShow(false);
                };
            }
            fetchData();
        }
    }, [artesanatos, show]);

    function ComprarArtesanato(titulo, id) {
        if (show) {
            setTitle(titulo);
            setId(id);
        } else {
            setShow(false);
            alert("Você precisa está logado como cliente.")
        }
    }

    return (
        <div className="row my-3 justify-content-center text-break rounded-3">
            {show && (
                <ModalCompra title={title} id={id} />
            )}


            <div className="row align-content-start">
                <marquee className="fs-5 pt-2 text-white colorPadrao rounded mx-2">
                    Seja bem-vindo(a), aproveite nossos cupons de desconto!!! &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    Utilize o cupom SOMOSTODOSPINDORAMA e ganhe 10% de desconto na sua compra. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    Aproveita suas férias com 5% de desconto utilizando o cupom FERIAS. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    Para te motivar ainda mais conhecer um pouco da cultura indigena, aqui está um cupom de 15% de desconto MAISCULTURA.
                </marquee>


                {artesanatos && (
                    <>
                        {artesanatos.map(artesanato => (

                            <div className="col-6 col-sm-6 col-md-4 col-lg-3 my-2">
                                <div className="card colorPadrao2 rounded">
                                    <CardCompra key={artesanato.id}
                                        id={artesanato.id} titulo={artesanato.nome} descricao={artesanato.descricao} preco={artesanato.valor} InsImg={artesanato.imagem} />
                                    <button value="Comprar" className="btn colorPadrao btn-outline-warning text-white" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => ComprarArtesanato("Comprar Artesanato", artesanato.id)}>Comprar</button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default Artesanatos