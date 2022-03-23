import React, { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import { getCurrentUser } from '../../services/auth.service';
import { buscarClienteIdUser, cancelarPacote } from '../../services/cliente.service';
import { buscarPacote } from '../../services/pacote.service';



function FormPacoteCL({ id, titulo }) {

    const [pacote, setPacote] = useState();
    const [validacao, setValidacao] = useState();
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchData() {
            if (id !== null && titulo === "Cancelar Pacote") {
                const res = await buscarPacote(id);
                if (res.id !== null) {
                    setPacote(res);
                }
            }
        }
        fetchData();
    }, [id, titulo]);


    const CancelarPacote = async (e) => {
        e.preventDefault()
        setValidacao("");

        const userlogado = getCurrentUser();
        const cliente = await buscarClienteIdUser(userlogado.id);

        if (userlogado !== undefined && userlogado.roles.includes("ROLE_CLIENTE")) {
            if (titulo === "Cancelar Pacote" && id !== null) {
                console.log(cliente.id, pacote);
                cancelarPacote(cliente.id, pacote).then(() => {
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
            {pacote && (
                <>
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 mx-auto">
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-11">
                                        <label className="control-label mt-1 text-center border border-1 border-warning rounded w-100 mb-2">
                                            Descricao:
                                        </label>
                                        <textarea className="form-control bg-transparent btn-outline-warning" rows="6 " value={pacote.descricao} readOnly={true} />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 mx-auto">
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-4 col-sm-3 col-md-3 col-lg-4 border border-1 border-warning rounded ">
                                        <label className="control-label mt-1"> Destino:</label>
                                    </div>
                                    <div className="col-8 col-sm-9 col-md-9 col-lg-8">
                                        <input type="text" className="form-control bg-transparent btn-outline-warning" value={pacote.aldeia.nome} readOnly={true} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-4 col-sm-3 col-md-3 col-lg-4 border border-1 border-warning rounded ">
                                        <label className="control-label mt-1"> Valor:</label>
                                    </div>
                                    <div className="col-8 col-sm-9 col-md-9 col-lg-8">
                                        <input type="text" className="form-control bg-transparent btn-outline-warning" value={pacote.valor} readOnly={true} />
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
                                        <input type="date" className="form-control bg-transparent btn-outline-warning" value={pacote.dataIda.substr(0,10)} readOnly={true} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 border border-1 border-warning rounded ">
                                        <label className="control-label mt-1">Data Volta:</label>
                                    </div>
                                    <div className="col-8 col-sm-8 col-md-8 col-lg-8">
                                        <input type="date" className="form-control bg-transparent btn-outline-warning" value={pacote.dataVolta.substr(0,10)} readOnly={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row justify-content-center">
                            <div className="col-10 col-sm-6 col-md-4 col-lg-3">
                                <button className="btn w-100 btn-lg colorPadrao btn-outline-warning text-white" onClick={CancelarPacote}>{
                                    titulo.substr(0, titulo.indexOf(" "))}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </form>
    )
}
export default FormPacoteCL