import FormAldeia from "./FormAldeia"
import FormAldeiaArtesanato from "./artesanato/FormAldeiaArtesanato"
import FormAldeiaPacote from "./pacote/FormAldeiaPacote"
import FormImagem from "./FormImagem"

function ModalAldeia({ id, titulo }) {

    return (
        <div className="modal bg-transparent" id="ModalAl">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content colorPadrao2">
                    <div className="modal-header">
                        <h4 className="modal-title" id="editarModalLabel">{titulo}</h4>
                        <button type="button" className="btn colorPadrao btn-outline-warning text-white" data-bs-dismiss="modal"
                            aria-label="Close">X</button>
                    </div>
                    <div className="modal-body justify-content-center align-content-center mx-2">
                        {id && (titulo === "Apagar Dados" || titulo === "Alterar Dados") && (
                            <FormAldeia id={id} titulo={titulo} />
                        )}

                        {id && (titulo === "Apagar Pacote" || titulo === "Alterar Pacote" || titulo === "Cadastro Pacote") && (
                            <FormAldeiaPacote id={id} titulo={titulo} />
                        )}

                        {id && (titulo === "Apagar Artesanato" || titulo === "Alterar Artesanato" || titulo === "Cadastro Artesanato") && (
                            <FormAldeiaArtesanato id={id} titulo={titulo} />
                        )}

                        {id && (titulo === "Imagem Pacote" || titulo === "Imagem Artesanato") && (
                            <FormImagem id={id} titulo={titulo} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalAldeia