import FormArtesanatoAdm from './FormArtesanatoAdm';
import FormContatoAdm from './FormContatoAdm';
import FormPacoteAdm from './FormPacoteAdm';

function ModalAdm({ id, idcl ,title }) {

    return (

        <div className="modal fade bg-transparent" id="ModalAdm">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content colorPadrao2">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editarModalLabel">{title}</h5>
                        <button type="button" className="btn colorPadrao btn-outline-warning text-white" data-bs-dismiss="modal"
                            aria-label="Close">X</button>
                    </div>
                    <div className="modal-body justify-content-center align-content-center mx-2">

                        {id && (title === "Apagar Mensagem" || title === "Alterar Mensagem") && (
                            <FormContatoAdm id={id} title={title} />
                        )}

                        {id && idcl && (title === "Cancelar Pacote") && (
                            <FormPacoteAdm id={id} idcl={idcl} titulo={title} />
                        )}

                        {id && idcl && (title === "Cancelar Artesanato") && (
                            <FormArtesanatoAdm id={id} idcl={idcl} titulo={title} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalAdm