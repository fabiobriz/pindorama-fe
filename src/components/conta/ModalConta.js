import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../../services/auth.service";
import { excluirUser } from "../../services/user.service";

function ModalConta() {

    const [validacao, setValidacao] = useState();
    const navigate = useNavigate();

    const deletar = (e) => {
        e.preventDefault()
        setValidacao("");

        const userlogado = getCurrentUser();
        console.log(userlogado.email);
        if (userlogado !== null && (userlogado.roles.includes("ROLE_CLIENTE") || userlogado.roles.includes("ROLE_ALDEIA") || userlogado.roles.includes("ROLE_ADMIN"))) {

            excluirUser(userlogado.id).then(() => {
                navigate("/");
                window.location.reload();
                logout();

            }, (error) => {
                const msgErro = (error.response &&
                    error.response.data && error.response.data.message) || error.message || error.toString();
                setValidacao(msgErro);
            });
        }
    }


    return (

        <div className="modal fade bg-transparent" id="ModalConta">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content colorPadrao2">
                    <div className="modal-header">
                        <h4 className="modal-title" id="editarModalLabel">Excluir Conta</h4>
                        <button type="button" className="btn colorPadrao btn-outline-warning text-white" data-bs-dismiss="modal"
                            aria-label="Close">X</button>
                    </div>
                    <div className="modal-body justify-content-center align-content-center mx-2">
                        <span id="campos" className="mb-3"> </span>
                        {validacao && (
                            <span>
                                {validacao}
                            </span>
                        )}
                        <h5 className="text-danger fw-bolder">Deseja mesmo excluir sua conta?</h5>

                    </div>
                    <div className="modal-footer p-1">
                        <button id="delete" className="btn text-white btn-danger" onClick={deletar}>Confirmar</button>
                        <button type="button" className="btn colorPadrao btn-outline-warning text-white" data-bs-dismiss="modal"
                            aria-label="Close">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalConta