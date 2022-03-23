import TabelaContatosAdm from "../administracao/TabelaContatosAdm"
import React, { useState } from 'react';
import TabelaPacotesAdm from "../administracao/TabelaPacotesAdm";
import TabelaArtesanatosAdm from "../administracao/TabelaArtesanatosAdm";




function Administracao() {

    const [btnContato, setBtnContato] = useState(true);
    const [btnPacote, setBtnPacote] = useState(false);
    const [btnArtesanato, setBtnArtesanato] = useState(false);
    const [title, setTitle] = useState("Contatos");



    function showTable(titulo) {
        if (titulo === "Pacote") {
            setBtnContato(false);
            setBtnArtesanato(false);
            setBtnPacote(true);
            setTitle("Lista de Pacotes");
        } else if (titulo === "Artesanato") {
            setBtnContato(false);
            setBtnArtesanato(true);
            setBtnPacote(false);
            setTitle("Lista de Artesanatos");
        } else if (titulo === "Contato") {
            setBtnContato(true);
            setBtnArtesanato(false);
            setBtnPacote(false);
            setTitle("Caixa de Contatos");
        }
    }


    return (
        <div className="row h-25 my-4">
            <div className="col-2 mx-3">
                <div className="row">
                    <button className="btn colorPadrao btn-outline-warning text-white my-1 mx-auto" onClick={(e) => showTable("Contato")}>Caixa de Contatos</button>
                </div>
                <div className="row">
                    <button className="btn colorPadrao btn-outline-warning text-white my-1 mx-auto" onClick={(e) => showTable("Pacote")}>Compras de Pacotes</button>
                </div>
                <div className="row">
                    <button className="btn colorPadrao btn-outline-warning text-white my-1 mx-auto" onClick={(e) => showTable("Artesanato")}>Compras de Artesanatos</button>
                </div>
            </div>

            <div className="col-9 colorPadrao rounded py-3 text-center text-break">
                <h3 className="mb-3">Administracao do Site - {title}</h3>
                <div className="row justify-content-center mt-2">
                    {btnContato && (
                        <TabelaContatosAdm />
                    )}
                    {btnPacote && (
                        <TabelaPacotesAdm />
                    )}
                    {btnArtesanato && (
                        <TabelaArtesanatosAdm />
                    )}
                </div>
            </div>
        </div >
    )

}

export default Administracao