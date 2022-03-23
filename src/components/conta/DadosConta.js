
import ModalConta from "./ModalConta";



function DadosConta() {
    

    return (
        <div className="row mx-5">
            <ModalConta/>
            <h3>Dados da Conta</h3>
            <p>Sua conta contém dados pessoais que você nos forneceu. Esta página permite que você baixe ou exclua esses dados.</p>
            <p className="fs-5 fw-bold text-danger mb-4" >A exclusão da conta removerá permanentemente sua conta e todos os seus dados isso não poderá ser recuperado.</p>
            <p>
                <button id="delete" className="btn text-white btn-danger" data-bs-toggle="modal" data-bs-target="#ModalConta" >Excluir Conta</button>
            </p>
        </div >

    )
}
export default DadosConta