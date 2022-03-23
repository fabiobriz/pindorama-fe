import React, { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import { getCurrentUser } from '../../../services/auth.service';
import { buscarPacote, createPacote, deletePacote, updatePacote } from '../../../services/pacote.service';


function FormAldeiaPacote({ id, titulo }) {

    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState()
    const [dataIda, setDataIda] = useState('')
    const [dataVolta, setDataVolta] = useState();
    const [validacao, setValidacao] = useState();
    const [read, setRead] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchData() {
            if (id !== null && (titulo === "Alterar Pacote" || titulo === "Apagar Pacote")) {
                const res = await buscarPacote(id);
                if (res.id !== null) {
                    setRead(titulo === "Apagar Pacote" ? true : false);
                    setDescricao(res.descricao);
                    setValor(res.valor);
                    setDataIda(res.dataIda.substr(0, 10));
                    setDataVolta(res.dataVolta.substr(0, 10));
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
            if (titulo !== "Apagar Pacote" && id !== null) {
                if (descricao === '' || valor === '' || dataIda === '' || dataVolta === '') {
                    document.getElementById("campos").innerHTML = "Preencha todos os campos."
                } else {
                    document.getElementById("campos").innerHTML = ""

                    if (titulo === "Alterar Pacote" && id !== "") {
                        updatePacote(id, descricao, valor, dataIda, dataVolta
                        ).then(() => {
                            window.location.reload();

                        }, (error) => {
                            const msgErro = (error.response &&
                                error.response.data && error.response.data.message) || error.message || error.toString();
                            setValidacao(msgErro);
                        });
                    } else if(titulo === "Cadastro Pacote" && id !== "") {
                        createPacote(descricao, valor, dataIda, dataVolta, id).then(() => {
                            window.location.reload();

                        }, (error) => {
                            const msgErro = (error.response &&
                                error.response.data && error.response.data.message) || error.message || error.toString();
                            setValidacao(msgErro);
                        });
                    }
                }
            } else if (titulo === "Apagar Pacote" && id !== null) {
                console.log(titulo);
                deletePacote(id).then(() => {
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
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 mx-auto">
                    <div className="form-group mb-3">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-11 p-0">
                                <label className="control-label mt-1 text-center border border-1 border-warning rounded w-100 mb-2">
                                    Descricao:
                                </label>
                                <textarea className="form-control bg-transparent btn-outline-warning" rows="4" value={descricao} onChange={(e) => setDescricao(e.target.value)} readOnly={read} />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 mx-auto">
                    <div className="form-group mb-3">
                        <div className="row">
                            <div className="col-4 col-sm-3 col-md-3 col-lg-4 border border-1 border-warning rounded ">
                                <label className="control-label mt-1"> Valor:</label>
                            </div>
                            <div className="col-8 col-sm-9 col-md-9 col-lg-8">
                                <input type="text" className="form-control bg-transparent btn-outline-warning" value={valor} onChange={(e) => setValor(e.target.value)} readOnly={read} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <div className="row">
                            <div className="col-4 col-sm-3 col-md-3 col-lg-3 border border-1 border-warning rounded ">
                                <label className="control-label mt-1 text-center">
                                    Data Ida:
                                </label>
                            </div>
                            <div className="col-8 col-sm-9 col-md-9 col-lg-9">
                                <input type="date" className="form-control bg-transparent btn-outline-warning" value={dataIda} onChange={(e) => setDataIda(e.target.value)} readOnly={read} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <div className="row">
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 border border-1 border-warning rounded ">
                                <label className="control-label mt-1">Data Volta:</label>
                            </div>
                            <div className="col-8 col-sm-8 col-md-8 col-lg-8">
                                <input type="date" className="form-control bg-transparent btn-outline-warning" value={dataVolta} onChange={(e) => setDataVolta(e.target.value)} readOnly={read} />
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
export default FormAldeiaPacote