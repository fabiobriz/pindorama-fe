import FormArtesanatoCL from "./FormArtesanatoCL"
import FormCliente from "./FormCliente"
import FormPacoteCL from "./FormPacoteCL"



function ModalCliente({ id, titulo }) {


    return (

        <div className="modal fade bg-transparent" id="ModalCl">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content colorPadrao2">
                    <div className="modal-header">
                        <h4 className="modal-title" id="editarModalLabel">{titulo}</h4>
                        <button type="button" className="btn colorPadrao btn-outline-warning text-white" data-bs-dismiss="modal"
                            aria-label="Close">X</button>
                    </div>
                    <div className="modal-body justify-content-center align-content-center mx-2">
                        {id && (titulo === "Apagar Dados" || titulo === "Alterar Dados") && (
                            <FormCliente id={id} titulo={titulo} />
                        )}
                        {id && (titulo === "Cancelar Artesanato") && (
                            <FormArtesanatoCL id={id} titulo={titulo} />
                        )}
                        {id && titulo === "Cancelar Pacote" && (
                            <FormPacoteCL id={id} titulo={titulo} />
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalCliente


