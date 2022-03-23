import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { buscarArtesanato } from '../../services/artesanato.service';
import { buscarCliente, cancelarArtesanato } from '../../services/cliente.service';



function FormArtesanatoAdm({ id, idcl, titulo }) {

    const [artesanato, setArtesanato] = useState();
    const [validacao, setValidacao] = useState();
    const navigate = useNavigate();


    useEffect(() => {
        if (artesanato === undefined) {
            if (id !== null && titulo === "Cancelar Artesanato") {
                async function fetchData() {
                    const res = await buscarArtesanato(id);
                    if (res.id !== null) {
                        setArtesanato(res);
                    }
                }
                fetchData();
            }
        }
    }, [id, artesanato, titulo]);



    const CancelarArtesanato = async (e) => {
        e.preventDefault()
        setValidacao("");

        const cliente = await buscarCliente(idcl);

        if (cliente !== undefined && titulo === "Cancelar Artesanato" && id !== null) {
            cancelarArtesanato(cliente.id, artesanato).then(() => {
                window.location.reload();
            }, (error) => {
                const msgErro = (error.response &&
                    error.response.data && error.response.data.message) || error.message || error.toString();
                setValidacao(msgErro);
            });
        } else {
            navigate("/");
            window.location.reload();
        }
    }

    return (
        <form>
            <span id="campos" className="mb-3"> </span>
            {validacao && (
                <span>
                    {validacao}
                </span>
            )}
            {artesanato && (
                <>
                    {artesanato.id && (
                        <>
                            <div className="row">
                                <div className="col-11 col-sm-11 col-md-11 col-lg-6 mx-auto">
                                    <div className="form-group mb-3">
                                        <div className="row">
                                            <div className="col-4 col-sm-3 col-md-3 col-lg-3 border border-1 border-warning rounded ">
                                                <label className="control-label mt-1 text-center">
                                                    Nome:
                                                </label>
                                            </div>
                                            <div className="col-8 col-sm-9 col-md-9 col-lg-9">
                                                <input className="form-control bg-transparent btn-outline-warning" value={artesanato.nome} readOnly={true} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <div className="row">
                                            <div className="col-4 col-sm-3 col-md-3 col-lg-3 border border-1 border-warning rounded ">
                                                <label className="control-label mt-1"> Valor:</label>
                                            </div>
                                            <div className="col-8 col-sm-9 col-md-9 col-lg-9">
                                                <input type="text" className="form-control bg-transparent btn-outline-warning" value={artesanato.valor} readOnly={true} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-11 col-sm-11 col-md-11 col-lg-6 mx-auto">
                                    <div className="form-group mb-3">
                                        <div className="row">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-0">
                                                <label className="control-label my-1 text-center w-100 border border-1 border-warning rounded">
                                                    Descricao:
                                                </label>
                                                <textarea className="form-control bg-transparent btn-outline-warning" value={artesanato.descricao} o readOnly={true} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row justify-content-center">
                                    <div className="col-10 col-sm-6 col-md-4 col-lg-3">
                                        <button className="btn w-100 btn-lg colorPadrao btn-outline-warning text-white" onClick={CancelarArtesanato}>{
                                            titulo.substr(0, titulo.indexOf(" "))}</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </form >
    )
}
export default FormArtesanatoAdm