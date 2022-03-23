import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { buscarArtesanato, createArtesanato, deleteArtesanato, updateArtesanato } from '../../../services/artesanato.service';
import { getCurrentUser } from '../../../services/auth.service';



function FormAldeiaArtesanato({ id, titulo }) {

    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState()
    const [validacao, setValidacao] = useState();
    const [read, setRead] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchData() {
            if (id !== null  && (titulo === "Alterar Artesanato" || titulo === "Apagar Artesanato")) {
                const res = await buscarArtesanato(id);
                if (res.id !== null) {
                    setRead(titulo === "Apagar Artesanato" ? true : false);
                    setNome(res.nome)
                    setDescricao(res.descricao);
                    setValor(res.valor);
                }
            }
        }
        fetchData();
    }, [id, titulo]);


    const validarCadastro = (e) => {
        e.preventDefault()
        setValidacao("");

        const userlogado = getCurrentUser();

        if (userlogado !== undefined && userlogado.roles.includes("ROLE_ALDEIA")) {
            if (titulo !== "Apagar Artesanato" && id !== null) {
                if (descricao === '' || valor === '' || nome === '') {
                    document.getElementById("campos").innerHTML = "Preencha todos os campos."
                } else {
                    document.getElementById("campos").innerHTML = ""

                    if (titulo === "Alterar Artesanato" && id !== "") {
                        updateArtesanato(id, nome, descricao, valor
                        ).then(() => {
                            window.location.reload();
                        }, (error) => {
                            const msgErro = (error.response &&
                                error.response.data && error.response.data.message) || error.message || error.toString();
                            setValidacao(msgErro);
                        });
                    } else if(titulo === "Cadastro Artesanato" && id !== undefined) {
                        createArtesanato(nome, descricao, valor, id).then(() => {
                            window.location.reload();
                        }, (error) => {
                            const msgErro = (error.response &&
                                error.response.data && error.response.data.message) || error.message || error.toString();
                            setValidacao(msgErro);
                        });
                    }
                }
            } else if (titulo === "Apagar Artesanato" && id !== null) {
                deleteArtesanato(id).then(() => {
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
    }

    return (
        <form>
            <span id="campos" className="mb-3"> </span>
            {validacao && (
                <span>
                    {validacao}
                </span>
            )}
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
                                <input className="form-control bg-transparent btn-outline-warning" defaultValue={nome} onChange={(e) => setNome(e.target.value)} readOnly={read} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <div className="row">
                            <div className="col-4 col-sm-3 col-md-3 col-lg-3 border border-1 border-warning rounded ">
                                <label className="control-label mt-1"> Valor:</label>
                            </div>
                            <div className="col-8 col-sm-9 col-md-9 col-lg-9">
                                <input type="text" className="form-control bg-transparent btn-outline-warning" defaultValue={valor} onChange={(e) => setValor(e.target.value)} readOnly={read} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-11 col-sm-11 col-md-11 col-lg-6 mx-auto">
                    <div className="form-group mb-3">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <label className="control-label my-1 text-center w-100 border border-1 border-warning rounded">
                                    Descricao:
                                </label>
                                <textarea className="form-control bg-transparent btn-outline-warning" defaultValue={descricao} onChange={(e) => setDescricao(e.target.value)} readOnly={read} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row justify-content-center">
                    <div className="col-10 col-sm-6 col-md-4 col-lg-3">
                        <button className="btn w-100 btn-lg colorPadrao btn-outline-warning text-white" onClick={validarCadastro}>{titulo ? (
                            titulo.substr(0, titulo.indexOf(" "))
                        ) : (
                            "Cadastrar"
                        )}</button>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default FormAldeiaArtesanato