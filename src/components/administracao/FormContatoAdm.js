import React, { useEffect, useState } from 'react';
import { buscarMensagem, updateMensagem, deleteMensagem } from '../../services/contato.service'

function FormContatoAdm({ id, title }) {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [read, setRead] = useState(false);
    const [oldContato, setOldContato] = useState();

    useEffect(() => {
        if (id !== null && (title === "Alterar Mensagem" || title === "Apagar Mensagem")) {
            if (oldContato === undefined) {
                async function fetchData() {
                    const res = await await buscarMensagem(id)
                    if (res.id !== null) {
                        setRead(title === "Apagar Mensagem" ? true : false);
                        setOldContato(res);
                        setNome(res.nome);
                        setEmail(res.email);
                        setMensagem(res.mensagem);
                    }
                }
                fetchData();
            }
        }
    }, [id, title, oldContato])



    const handleClick = (e) => {
        e.preventDefault()
        if (title === "Alterar Mensagem") {
            updateMensagem(id, nome, email, mensagem)
            .then(window.location.reload());
        } else if (title === "Apagar Mensagem") {
            deleteMensagem(id)
            .then(window.location.reload());
        }
    }
    return (

        <form>
            {oldContato && (
                <>
                    <div className="row ">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 mx-auto">
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-3 col-sm-3 col-md-3 col-lg-3 border border-1 border-warning rounded ">
                                        <label className="control-label  mt-1">
                                            Nome:
                                        </label>
                                    </div>
                                    <div className="col-9 col-sm-9 col-md-9 col-lg-9 ">
                                        <input className="form-control  bg-transparent btn-outline-warning" onChange={(e) => setNome(e.target.value)} defaultValue={oldContato.nome} readOnly={read}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-2 col-sm-2 col-md-3 col-lg-3 border border-1 border-warning rounded ">
                                        <label className="control-label  mt-1">Email: </label>
                                    </div>
                                    <div className="col-10 col-sm-10 col-md-9 col-lg-9 ">
                                        <input className="form-control  bg-transparent btn-outline-warning" onChange={(e) => setEmail(e.target.value)} defaultValue={oldContato.email} readOnly={read} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 ">
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col p-0 m-0">
                                        <label className="control-label mb-1 border border-1 border-warning rounded w-100">Mensagem: </label>
                                        <textarea className="form-control bg-transparent btn-outline-warning" onChange={(e) => setMensagem(e.target.value)} defaultValue={oldContato.mensagem} readOnly={read} rows="5"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-warning colorPadrao"
                                data-bs-dismiss="modal">
                                Sair
                            </button>
                            <button type="submit" data-bs-save="modal" onClick={handleClick} className="btn btn-outline-warning colorPadrao">{title.substr(0, title.indexOf(' '))}</button>
                        </div>
                    </div>
                </>
            )}
        </form>

    )
}

export default FormContatoAdm