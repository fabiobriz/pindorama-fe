import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/auth.service';
import CardAldeia from '../aldeia/CardAldeia';
import CardCliente from '../cliente/CardCliente';
import DadosConta from '../conta/DadosConta';
import Email from '../conta/Email';
import Senha from '../conta/Senha';
// import Username from '../conta/Username';

function GerenciarConta() {
    const [user, setUser] = useState();

    useEffect(() => {
        if (user === undefined) {
            async function fetchData() {
                const use = await getCurrentUser()
                setUser(use);
            }
            fetchData();
        }
    }, [user]);


    const [btnEmail, setBtnEmail] = useState(false);
    // const [btnUsername, setBtnUsername] = useState(false);
    const [btnSenha, setBtnSenha] = useState(false);
    const [btnDados, setBtnDados] = useState(false);
    const [btnGerenciar, setBtnGerenciar] = useState(true);

    function show(what) {
        if (what === "email") {
            setBtnEmail(true);
            setBtnDados(false);
            setBtnSenha(false);
            setBtnGerenciar(false);
            // setBtnUsername(false);
        } else if (what === "senha") {
            setBtnEmail(false);
            setBtnDados(false);
            setBtnSenha(true);
            setBtnGerenciar(false);
            // setBtnUsername(false);
        } else if (what === "dadosPessoais") {
            setBtnEmail(false);
            setBtnDados(true);
            setBtnSenha(false);
            setBtnGerenciar(false);
            // setBtnUsername(false);
        } else if (what === "gererenciarConta") {
            setBtnEmail(false);
            setBtnDados(false);
            setBtnSenha(false);
            setBtnGerenciar(true);
            // setBtnUsername(false);
        } 
        // else if (what === "username") {
        //     setBtnUsername(true);
        //     setBtnEmail(false);
        //     setBtnDados(false);
        //     setBtnSenha(false);
        //     setBtnGerenciar(false)
        // }
    }

    return (

        <div className="row w-75 h-50 py-3 text-center my-5 rounded colorPadrao2">
            {user && (
                <>
                    <h1 className="mt-3 p-0">Gerencie sua conta</h1>
                    <div className="col-md-3">
                        <ul className="nav nav-pills flex-column">
                            <li className="nav-item btn-outline-warning colorPadrao rounded  text-center mt-2"><button className="nav-link  btn-lg  w-100 text-white" onClick={(e) => show("gererenciarConta")} >Gerenciar Conta</button></li>
                            {(user.roles.includes("ROLE_CLIENTE") || user.roles.includes("ROLE_ALDEIA")) && (
                                <li className="nav-item btn-outline-warning colorPadrao rounded  text-center mt-2"><button className="nav-link  btn-lg  w-100 text-white" onClick={(e) => show("dadosPessoais")} >Dados Pessoais</button></li>
                            )}
                            {/* <li className="nav-item btn-outline-warning colorPadrao rounded text-center mt-2"><button className="nav-link w-100   btn-lg text-white" onClick={(e) => show("username")}>Username</button></li> */}
                            <li className="nav-item btn-outline-warning colorPadrao rounded text-center mt-2"><button className="nav-link w-100   btn-lg text-white" onClick={(e) => show("email")}>E-mail</button></li>
                            <li className="nav-item btn-outline-warning colorPadrao rounded  text-center mt-2"><button className="nav-link btn-lg w-100 text-white" onClick={(e) => show("senha")}>Senha</button></li>
                        </ul>
                    </div>

                    <div className="col-md-8">

                        {!btnDados && !btnEmail && !btnSenha && (
                            <div className="row mx-5 my-2">
                                <img src="/img/Indio-computador.png" className="rounded-pill" width="100%" height="auto" alt="indio-no-pc" />

                            </div>
                        )}

                        {user.roles.includes("ROLE_CLIENTE") && (
                            <>
                                {btnDados && (
                                    <CardCliente />
                                )}
                            </>
                        )}

                        {user.roles.includes("ROLE_ALDEIA") && (
                            <>
                                {btnDados && (
                                    <CardAldeia />
                                )}
                            </>
                        )}

                        {btnGerenciar && (
                            <DadosConta />
                        )}
                        {/* {btnUsername && (
                            <Username />
                        )} */}
                        {btnEmail && (
                            <Email />
                        )}
                        {btnSenha && (
                            <Senha />
                        )}
                    </div>
                </>
            )}
        </div>

    )
}

export default GerenciarConta