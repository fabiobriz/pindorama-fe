import ContatosForm from "../contatos-form/ContatosForm"
import EntremContato from "../contatos-form/EntremContato"

function Contatos() {
    return (
            <div className="row w-75 h-75 rounded my-5 p-5 colorPadrao2 justify-content-center ">
                <EntremContato/>
                <ContatosForm/>
            </div>
    )
}

export default Contatos