import { useState } from "react";
import TabelaArtesanatosCl from "../cliente/TabelaArtesanatosCl";
import TabelaPacotesCl from "../cliente/TabelaPacotesCl";



function ComprasCliente() {


    const [show, setShow] = useState(false);

    return (

        <div className="row h-25 my-4">
            <div className="col-2 mx-3">
                <div className="row">
                    <button type="button" className="btn colorPadrao btn-outline-warning text-white my-2 mx-auto" onClick={(e) => setShow(false)}>Pacotes</button>
                </div>
                <div className="row">
                    <button type="button" className="btn colorPadrao btn-outline-warning text-white my-2 mx-auto" onClick={(e) => setShow(true)}>Artesanatos</button>
                </div>
            </div>

            <div className="col-9 colorPadrao2 rounded py-3 text-center text-break">
                <div className="row justify-content-center mt-2">
                    {show ? (
                        <TabelaArtesanatosCl />
                    ) : (
                        <TabelaPacotesCl />
                    )}

                </div>
            </div>
        </div >

    )
}

export default ComprasCliente