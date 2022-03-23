/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { register, login } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { isEmail } from "validator";



function RegistrarForm() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [senhaConfirmada, setSenhaConfirmada] = useState('')
    const [validacao, setValidacao] = useState("");
    const navigate = useNavigate();




    const validarCadastro = async (e) => {
        e.preventDefault()
        setValidacao("");


        if (username === '' || password === '' || email === '' || senhaConfirmada === '') {
            document.getElementById("campos").innerHTML = "Preencha todos os campos."
            document.getElementById("confirm").innerHTML = ""
            document.getElementById("tipoUser").innerHTML = ""

        } else if (senhaConfirmada !== password) {
            document.getElementById("confirm").innerHTML = "Digite a mesma senha de cima."
            document.getElementById("campos").innerHTML = ""
            document.getElementById("tipoUser").innerHTML = ""

        } else if (role === 'Escolha o tipo') {
            document.getElementById("tipoUser").innerHTML = "Escolha seu tipo de usuario."
            document.getElementById("campos").innerHTML = ""
            document.getElementById("confirm").innerHTML = ""

        } else if (!isEmail(email)) {
            document.getElementById("campos").innerHTML = "Digite um email válido."


        } else {
            document.getElementById("tipoUser").innerHTML = ""
            document.getElementById("campos").innerHTML = ""
            document.getElementById("confirm").innerHTML = ""

            register(username, email, password, role.toString().toLowerCase()).then(() => {

                login(username, password).then(() => {
                    if (role === "Cliente") {
                        navigate("/CadastroDadosCliente");
                        window.location.reload();
                    } else if(role === "Aldeia"){
                        navigate("/CadastroDadosAldeia");
                        window.location.reload();
                    }else{
                        navigate("/");
                        window.location.reload();
                    }
                });

            }, (error) => {
                const msgErro = (error.response &&
                    error.response.data && error.response.data.message) || error.message || error.toString();
                setValidacao(msgErro);
            }

            );
        }

    }


    return (
        <div className="col-12 col-sm-12 col-md-10 col-lg-8">

            <form className="py-4 colorPadrao2 rounded text-break">
            <h1>Cadastro de Usuario</h1>
            <hr />
                <span id="campos" className="mb-3">
                    {validacao && (
                        validacao.forEach(element => {
                            return element;
                        })
                    )}
                </span>
                <div className="form-group mb-3">
                    <div className="row mx-auto">
                        <div className="col-3 col-sm-2 col-md-2 col-lg-2 pe-0 rounded">
                            <label className="input-group-text bg-transparent btn-outline-warning">E-mail</label>
                        </div>
                        <div className="col-9 col-sm-8 col-md-8 col-lg-6">
                            <input type="email" className="form-control bg-transparent btn-outline-warning" placeholder="email@pindorama.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <div className="row mx-auto">
                        <div className="col-3 col-sm-2 col-md-2 col-lg-2 pe-0 rounded">
                            <label className="input-group-text bg-transparent btn-outline-warning">Username</label>
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-6">
                            <input type="text" className="form-control bg-transparent btn-outline-warning" placeholder="pindorama" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <div className="row mx-auto">
                        <div className="col-3 col-sm-2 col-md-2 col-lg-2 pe-0 rounded">
                            <label className="input-group-text bg-transparent btn-outline-warning">Senha</label>
                        </div>
                        <div className="col-9 col-sm-8 col-md-8 col-lg-6">
                            <input type="password" className="form-control bg-transparent btn-outline-warning" placeholder="************" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <div className="row mx-auto">
                        <div className="col-3 col-sm-2 col-md-2 col-lg-3 pe-0 rounded">
                            <label className="input-group-text bg-transparent btn-outline-warning">Confirmar Senha</label>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-5">
                            <input type="password" className="form-control bg-transparent btn-outline-warning" placeholder="************" value={senhaConfirmada} onChange={(e) => (setSenhaConfirmada(e.target.value))} />
                        </div>
                        <span id="confirm"></span>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <div className="row mx-auto">
                        <div className="col-3 col-sm-2 col-md-2 col-lg-3 pe-0 rounded">
                            <label className="input-group-text bg-transparent btn-outline-warning ms">Tipo de usuario</label>
                        </div>
                        <div className="col-2 col-sm-2 col-md-1 col-lg-1" >
                            <select className="text-center bg-transparent btn-outline-warning rounded py-2" defaultValue="Escolha o tipo" onChange={(e) => setRole(e.target.value)}>
                                <option>Escolha o tipo</option>
                                <option>Cliente</option>
                                <option>Aldeia</option>
                                <option>Admin</option>
                            </select>
                        </div>
                        <span id="tipoUser"></span>
                    </div>
                </div>
                <div className="form-group d-flex justify-content-center mb-3">
                    <button onClick={validarCadastro} className="btn w-50 text-white colorPadrao btn-outline-warning btn-round mb-4 mt-3">Cadastrar</button>
                </div>
            </form>
        </div>
    )
}

export default RegistrarForm;