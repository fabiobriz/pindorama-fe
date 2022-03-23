import React, {useState } from 'react';
import {createMensagem} from "../../services/contato.service"

function ContatosForm() {
    
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [mensagem, setMensagem] = useState('')


    const handleClick = (e) => {
        e.preventDefault()
        alert("Entraremos em contato em breve.")
    
       
        if(nome !== '' && email !== '' && mensagem !== ''){
            createMensagem(nome, email, mensagem);
        }
       
    }


    return (
        <div className="col-12 col-sm-12 col-md-5 col-lg-6 shadow rounded p-3">
            <form noValidate autoComplete="off">
                <div className="form-group d-inline-flex mb-3 mx-2">
                    <span className="input-group-text bg-transparent btn-outline-warning">Nome</span>
                    <input type="text" className="form-control bg-transparent btn-outline-warning"  placeholder="Fulano beutrano" value={nome} onChange={(e)=>setNome(e.target.value)}/>
                </div>
                <div className="form-group d-inline-flex mb-3 mx-2">
                    <span className="input-group-text bg-transparent btn-outline-warning">E-mail</span>
                    <input type="text" className="form-control bg-transparent btn-outline-warning"  placeholder="email@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="form-group mb-3 mx-2">
                    <span className="input-group-text bg-transparent btn-outline-warning">Mensagem</span>
                    <textarea className="form-control bg-transparent btn-outline-warning mt-1" rows="5" placeholder="Digite o motivo do contato..." value={mensagem} onChange={(e)=>setMensagem(e.target.value)}></textarea>
                </div>
                <div className="form-group d-flex justify-content-center">
                    <button type="submit" onClick={handleClick} className="btn w-25 text-white colorPadrao btn-outline-warning">Enviar</button>
                </div>
            </form>
        </div>

        


        
    )
}

export default ContatosForm