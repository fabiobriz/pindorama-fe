/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import { logout, getCurrentUser } from "../../services/auth.service";

function NavBar() {


    const [showCliente, setShowCliente] = useState(false);
    const [showAldeia, setShowAldeia] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowCliente(user.roles.includes("ROLE_CLIENTE"));
            setShowAldeia(user.roles.includes("ROLE_ALDEIA"));
            setShowAdmin(user.roles.includes("ROLE_ADMIN"));
        }
    }, []);
    const logOut = () => {
        logout()
    };


    return (

        <nav className="navbar navbar-expand-lg navbar-light text-white colorPadrao">
            <Link className="navbar-brand mx-3" to='/' >
                <img src="/img/icon-home.png" alt="Home" />
            </Link>
            <a className="navbar-toggler btn-sm btn-outline-warning mx-3" data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </a>
            <div className="collapse navbar-collapse justify-content-end mx-3" id="collapsibleNavId">
                <ul className="navbar-nav">
                    <li className="nav-item mx-2 my-1">
                        <Link className="btn w-100 btn-md btn-outline-warning text-white" to='/Artesanatos'>Artesanatos</Link>
                    </li>
                    <li className="nav-item mx-2 my-1">
                        <Link className="btn w-100 btn-md btn-outline-warning text-white" to='/Pacotes'>Pacotes</Link>
                    </li>
                    <li className="nav-item mx-2 my-1">
                        <Link className="btn w-100 btn-md btn-outline-warning text-white" to='/Sobre'>Sobre</Link>
                    </li>

                    <li className="nav-item mx-2 my-1">
                        <Link className="btn w-100 btn-md btn-outline-warning text-white" to='/Prevencoes'>Prevenções</Link>
                    </li>
                    <li className="nav-item mx-2 my-1">
                        <Link className="btn w-100 btn-md btn-outline-warning text-white " to='/Contatos'>Contatos</Link>
                    </li>

                    {showAdmin && (
                        <li className="nav-item mx-2 my-1 dropdown">
                            <a className="btn btn-md w-100  btn-outline-warning text-white dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Olá, {currentUser.username}
                            </a>

                            <ul className="dropdown-menu dropdown-menu-end colorPadrao mx-auto p-0" aria-labelledby="navbarDropdown">
                                <li><Link className="w-100 btn btn-md btn-outline-warning text-white" to="/GerenciarConta">Gerenciar Conta</Link>
                                </li>
                                <li>
                                    <Link className="btn btn-md btn-outline-warning text-white w-100" to='/Administracao'>Gerenciar Site</Link>
                                </li>
                                <li>
                                    <a href="/login" className="w-100 btn btn-md btn-outline-warning text-white" onClick={logOut}>Sair</a>
                                </li>
                            </ul>
                        </li>

                    )}
                    {showCliente && (
                        <li className="nav-item my-1 mx-2 dropdown">
                            <a className="btn btn-md w-100  btn-outline-warning text-white dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Olá, {currentUser.username}
                            </a>

                            <ul className="dropdown-menu dropdown-menu-end colorPadrao mx-auto p-0" aria-labelledby="navbarDropdown">
                                <li><Link className="w-100 btn btn-md btn-outline-warning text-white" to="/GerenciarConta">Gerenciar Conta</Link>
                                </li>
                                <li><Link className="w-100 btn btn-md btn-outline-warning text-white" to="/ComprasCliente">Minhas Compras</Link>
                                </li>
                                <li><a href="/login" className="w-100 btn btn-md btn-outline-warning text-white" onClick={logOut}>Sair</a>
                                </li>
                            </ul>
                        </li>
                    )}
                    {showAldeia && (
                        <li className="nav-item mx-2 my-1 dropdown">
                            <a className="btn btn-md w-100  btn-outline-warning text-white dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Olá, {currentUser.username}
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end colorPadrao mx-auto p-0" aria-labelledby="navbarDropdown">
                                <li><Link className="w-100 btn btn-md btn-outline-warning text-white" to="/GerenciarConta">Gerenciar Conta</Link>
                                </li>
                                <li><Link className="w-100 btn btn-md btn-outline-warning text-white" to="/AnunciosAldeia">Anúncios Aldeia</Link>
                                </li>
                                <li><a href="/login" className="w-100 btn btn-md btn-outline-warning text-white" onClick={logOut}>Sair</a>
                                </li>
                            </ul>
                        </li>
                    )}
                    {!currentUser && (
                        <>
                            <li className="nav-item mx-2 my-1">
                                <Link className="btn btn-md w-100 btn-outline-warning text-white" to='/Login'>Entrar</Link>
                            </li>
                            <li className="nav-item mx-2 my-1">
                                <Link className="btn btn-md w-100 btn-outline-warning text-white" to='/Registrar'>Resgistrar</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div >
        </nav >
    )
}




export default NavBar
