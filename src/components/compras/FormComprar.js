import React, { useState, useEffect } from 'react';
import { Desconto } from "./CompraFuncao";
import { buscarClienteIdUser, comprarArtesanato, comprarPacote } from "../../services/cliente.service";
import { buscarArtesanato } from "../../services/artesanato.service";
import { buscarPacote } from "../../services/pacote.service";
import { getCurrentUser } from "../../services/auth.service";
import { useNavigate } from 'react-router-dom';

function FormComprar({ title, id }) {

    const [cliente, setCliente] = useState()
    const [compra, setCompra] = useState()
    const navigate = useNavigate();



    useEffect(() => {

        if (id !== undefined && title !== undefined) {
                async function fetchData() {
                    const user = await getCurrentUser();
                    if (user !== undefined) {
                        setCliente(await buscarClienteIdUser(user.id))
                    }
                    if (title === "Comprar Pacote") {
                        setCompra(await buscarPacote(id));
                    } else if (title === "Comprar Artesanato") {
                        setCompra(await buscarArtesanato(id));
                    }
                }
                fetchData();
        }
    }, [cliente, id, title])


    const handleClick = async (e) => {
        e.preventDefault();

        if (title === "Comprar Pacote" && (cliente.id !== undefined && cliente.id !== null)  && (compra.id !== null && compra.id !== undefined)) {
            await comprarPacote(cliente.id, compra).then(() => {
                navigate("/ComprasCliente");
                window.location.reload();
            });
        } else if (title === "Comprar Artesanato" && (cliente.id !== undefined && cliente.id !== null) && (compra.id !== null && compra.id !== undefined)) {
            await comprarArtesanato(cliente.id, compra).then(() => {
                navigate("/ComprasCliente");
                window.location.reload();
            });
        }
    }

    return (
        <>
            {cliente && compra && (
                <form>
                    <div className="row  justify-content-center p-3">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 mx-auto">
                            <div className="row mb-3">
                                <div className="col-3 col-sm-3 col-md-3 col-lg-3 border border-1 border-warning rounded ">
                                    <label className="control-label mt-1">Nome: </label>
                                </div>
                                <div className="col-8 col-sm-8 col-md-8 col-lg-9 m-0">
                                    <input type="text" className="form-control bg-transparent btn-outline-warning" value={cliente.nome} readOnly />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-3 col-sm-3 col-md-3 col-lg-4 border border-1 border-warning rounded ">
                                    <label className="control-label mt-1">Nascimento: </label>
                                </div>
                                <div className="col-8 col-sm-8 col-md-8 col-lg-8 m-0">
                                    <input type="date" className="form-control bg-transparent btn-outline-warning" value={cliente.dataNascimento.substr(0, 10)} readOnly />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-3 col-sm-3 col-md-3 col-lg-3 border border-1 border-warning rounded ">
                                    <label className="control-label mt-1">CPF: </label>
                                </div>
                                <div className="col-8 col-sm-8 col-md-8 col-lg-9 m-0">
                                    <input type="text" className="form-control bg-transparent btn-outline-warning" value={cliente.cpf} readOnly />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-3 col-sm-3 col-md-3 col-lg-4 border border-1 border-warning rounded ">
                                    {title === "Comprar Pacote" ? (
                                        <label className="control-label mt-1">Origem: </label>
                                    ) : (
                                        <label className="control-label mt-1">Endereço: </label>
                                    )}
                                </div>
                                <div className="col-8 col-sm-8 col-md-8 col-lg-8 m-0">
                                    <input type="text" className="form-control bg-transparent btn-outline-warning" value={(cliente.endereco.estado + ", " + cliente.endereco.cidade)} />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 mx-auto">
                            {(title === "Comprar Pacote") ? (
                                <div className="row mb-3">
                                    <div className="col-3 col-sm-3 col-md-3 col-lg-3 border border-1 border-warning rounded ">
                                        <label className="control-label mt-1">Destino: </label>
                                    </div>
                                    <div className="col-8 col-sm-8 col-md-8 col-lg-9 m-0">
                                        <input type="text" className="form-control bg-transparent btn-outline-warning" value={compra.aldeia.nome} readOnly />
                                    </div>
                                </div>
                            ) : (
                                <div className="row mb-3">
                                    <div className="col-3 col-sm-3 col-md-3 col-lg-3 border border-1 border-warning rounded ">
                                        <label className="control-label mt-1">Tipo: </label>
                                    </div>
                                    <div className="col-8 col-sm-8 col-md-8 col-lg-9 m-0">
                                        <input type="text" className="form-control bg-transparent btn-outline-warning" value={compra.nome} readOnly />
                                    </div>
                                </div>
                            )}

                            {(title === "Comprar Pacote") && (
                                <>
                                    <div className="row mb-3">
                                        <div className="col-3 col-sm-3 col-md-3 col-lg-3 border border-1 border-warning rounded ">
                                            <label className="control-label mt-1">Data Ida: </label>
                                        </div>
                                        <div className="col-7 col-sm-7 col-md-7 col-lg-7 m-0">
                                            <input type="date" className="form-control bg-transparent btn-outline-warning" value={compra.dataIda.substr(0, 10)} readOnly />
                                        </div>
                                    </div>
                                    <div className="row mb-3" id="volta">
                                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 border border-1 border-warning rounded">
                                            <label className="control-label mt-1">Data Volta: </label>
                                        </div>
                                        <div className="col-7 col-sm-7 col-md-7 col-lg-7 m-0">
                                            <input type="date" className="form-control bg-transparent btn-outline-warning" value={compra.dataVolta.substr(0, 10)} readOnly />
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className="row mb-3">
                                <div className="col-3 col-sm-3 col-md-3 col-lg-3 border border-1 border-warning rounded ">
                                    <label className="control-label mt-1">Valor: </label>
                                </div>
                                <div className="col-8 col-sm-8 col-md-8 col-lg-9 m-0">
                                    <input type="text" className="form-control  bg-transparent btn-outline-warning" id="Valor" defaultValue={compra.valor} readOnly />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-3 col-sm-3 col-md-3 col-lg-3 border border-1 border-warning rounded ">
                                    <label className="control-label mt-1">Cupom: </label>
                                </div>
                                <div className="col-8 col-sm-8 col-md-8 col-lg-9 m-0">
                                    <input type="text" className="form-control bg-transparent btn-outline-warning" id="Cupom" />
                                </div>
                                <span className="text-danger m-0" id="AspCp"></span>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer m-0 py-2">
                        <div className="form-group">
                            <button type="button" className="btn btn-outline-warning text-white colorPadrao me-2"
                                data-bs-dismiss="modal">
                                Sair
                            </button>
                            <button type="button" className="btn btn-outline-warning text-white colorPadrao me-2" onClick={Desconto}> Aplicar Desconto </button>
                            <button type="submit" value="Comprar" onClick={handleClick} className="btn btn-outline-warning colorPadrao text-white" data-bs-dismiss="modal">Comprar</button>
                        </div>
                    </div>
                </form >
            )}
        </>

    )
}


export default FormComprar


