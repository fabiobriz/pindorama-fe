import FormComprar from "./FormComprar"



function ModalCompra({ title, id }) {

    return (
        <div className="modal fade bg-transparent" id="exampleModal" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content colorPadrao2">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                        <button type="button" className="btn colorPadrao btn-outline-warning text-white" data-bs-dismiss="modal"
                            aria-label="Close">X</button>
                    </div>
                    <div className="modal-body justify-content-center align-content-center mx-2">
                        <FormComprar title={title} id={id} />
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalCompra