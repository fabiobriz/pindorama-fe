import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import { login } from '../../services/auth.service'
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/auth.service";
import {buscarClienteIdUser} from "../../services/cliente.service"
import { buscarAldeiaIdUser } from '../../services/aldeia.service';


function LoginForm() {

    const form = useRef();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();


    const required = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    Este campo é requirido.
                </div>
            );
        }
    };


    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        login(username, password).then(
            () => {
                const user = getCurrentUser();                    
                if (user.roles.includes("ROLE_CLIENTE") && buscarClienteIdUser(user.id) === null) {
                    navigate("/DadosCliente");
                    window.location.reload();

                } else if (user.roles.includes("ROLE_ALDEIA") && buscarAldeiaIdUser(user.id) === null) {
                    navigate("/DadosAldeia");
                    window.location.reload();
                } else {
                    navigate("/");
                    window.location.reload();
                }

            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setLoading(false);
                setMessage(resMessage);
            }
        );
        setLoading(false);

    };


    return (
        <div className="col-11 col-sm-11 col-md-8 col-lg-6">
            <form ref={form} className=" py-4 colorPadrao2 rounded" >
            <h1>Login de Usuario</h1>
            <hr />
                {message && (
                    <div className="form-group">
                        <span role="alert">
                            {message}
                        </span>
                    </div>
                )}
                <div className="form-group mb-3">
                    <div className="row justify-content-center">
                        <div className="col-3 col-sm-3 col-md-3 col-lg-2">
                            <label className="input-group-text bg-transparent btn-outline-warning">Username</label>
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 p-0">
                            <input type="text" className="form-control bg-transparent btn-outline-warning" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} validations={[required]} />
                        </div>
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="row justify-content-center">
                        <div className="col-3 col-sm-3 col-md-3 col-lg-2">
                            <label className="input-group-text bg-transparent btn-outline-warning">Senha</label>
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 p-0">
                            <input type="password" className="form-control bg-transparent btn-outline-warning" placeholder="************" value={password} onChange={(e) => setPassword(e.target.value)} validations={[required]} />
                        </div>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <button className="btn w-50 text-white colorPadrao btn-outline-warning btn-round mb-4 mt-3 btn-block" onClick={handleLogin} disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Login</span>
                    </button>
                </div>

                <Link className="text-white " to='/Registrar'>Criar uma conta</Link>
            </form>
        </div>
    )
}

export default LoginForm;