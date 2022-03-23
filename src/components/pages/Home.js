import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/auth.service";
import { buscarClienteIdUser } from "../../services/cliente.service";
import { buscarAldeiaIdUser } from "../../services/aldeia.service";


function Home() {

    const [cli, setCli] = useState();
    const [ald, setAld] = useState();
    const navigate = useNavigate();



    useEffect(() => {

        if ((cli === undefined || cli.id === null) || (ald === undefined || ald.id === null)) {
            async function fetchData() {
                const user = await getCurrentUser()
                if (user.id !== undefined && user.roles.includes("ROLE_CLIENTE")) {
                    const cliente = await buscarClienteIdUser(user.id);
                    setCli(cliente);
                    if (cliente.id === null) {
                        navigate("/CadastroDadosCliente");
                        window.location.reload();
                    }
                } else if (user.id !== undefined && user.roles.includes("ROLE_ALDEIA")) {
                    const aldeia = await buscarAldeiaIdUser(user.id);
                    setAld(aldeia);
                    if (ald.id === null) {
                        navigate("/CadastroDadosAldeia");
                        window.location.reload();
                    }
                }
            }
            fetchData();
        }
    }, [ald, cli, navigate]);

    return (
        <aside className="row w-75">
            <div className="row colorPadrao2 justify-content-center mx-auto shadow rounded m-2 py-2">

                <div className="col-10 col-md-10 col-sm-10 col-lg-10 m-1 p-3 text-center rounded tex">

                    <h2>Seja bem vindo(a), venha fazer parte da nossa Aldeia!</h2>
                    <p>
                        O que vai fazer nas suas férias? Feriados? Que tal conhecer uma aldeia indígena perto de você?
                    </p>

                </div>
            </div>

            <div className="row colorPadrao2 rounded justify-content-center mx-auto shadow m-2 py-2">
                <div className="col-10 col-md-10 col-sm-10 col-lg-10 m-1 p-3 rounded">
                    <h3 className="text-center shadow-lg rounded py-1">Aldeias Parceiras</h3>
                    <div id="carouselExampleCaptions1" className="carousel slide d-flex justify-content-center shadow rounded" data-bs-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-bs-target="#carouselExampleCaptions1" data-bs-slide-to="0" className="active"></li>
                            <li data-bs-target="#carouselExampleCaptions1" data-bs-slide-to="1"></li>
                            <li data-bs-target="#carouselExampleCaptions1" data-bs-slide-to="2"></li>
                            <li data-bs-target="#carouselExampleCaptions1" data-bs-slide-to="3"></li>
                            <li data-bs-target="#carouselExampleCaptions1" data-bs-slide-to="4"></li>
                        </ol>
                        <Link to='/Pacotes'>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="/img/home1.jpg" className="mx-auto imgIndex rounded" alt="aldeia" />
                                </div>
                                <div className="carousel-item">
                                    <img src="/img/home2.png" className="mx-auto imgIndex rounded" alt="aldeia" />
                                </div>
                                <div className="carousel-item">
                                    <img src="/img/home3.jpg" className="mx-auto imgIndex rounded" alt="aldeia" />
                                </div>
                                <div className="carousel-item">
                                    <img src="/img/home4.jpeg" className="mx-auto imgIndex rounded" alt="aldeia" />
                                </div>
                                <div className="carousel-item">
                                    <img src="/img/home5.png" className="mx-auto imgIndex rounded" alt="aldeia" />
                                </div>
                            </div>
                        </Link>
                        <a className="carousel-control-prev" href="#carouselExampleCaptions1" role="button"
                            data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleCaptions1" role="button"
                            data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="row colorPadrao2 justify-content-center shadow py-2 rounded mx-auto my-3">

                <div className="col-11 col-sm-11 col-md-5 col-lg-5 m-1 rounded shadow colorPadrao" id="comentarios">
                    <div className="row d-flex px-0 py-3">
                        <div className="col-2 col-sm-2 col-md-2 col-lg-2  me-4">

                            <img src="/img/coment1.png"
                                className="d-flex mx-auto" alt="aldeia" />
                        </div>
                        <div className="col-12 col-md-12 col-sm-12 col-lg-9 text-wrap">
                            <h3 className="text-white">Monica Santos </h3>
                            <hr className="my-2 text-white" />
                            <p className="fs-5 text-white">
                                As viagens são grandes professoras. Viajantes dão um passo importante para quebrar preconceitos, sair da zona de conforto, se abrir para o diferente. Viajar tanto me fez ser uma pessoa com a mente mais curiosa, a cabeça mais aberta e um interesse maior em conhecer o outro.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-11 col-sm-11 col-md-5 col-lg-5 m-1 rounded shadow colorPadrao" id="comentarios">
                    <div className="row d-flex px-0 py-3">
                        <div className="col-2 col-md-2 col-sm-2 col-lg-2 me-4">
                            <img src="/img/coment2.png"
                                className="d-flex mx-auto" alt="aldeia" />
                        </div>
                        <div className="col-12 col-md-12 col-sm-12 col-lg-9 text-wrap">
                            <h3 className="text-white">Jose Nascimeno</h3>
                            <hr className="my-2 text-white" />
                            <p className="fs-5 text-white">
                                Às vezes, precisamos viajar para bem longe para nos encontrarmos bem de perto. Além de um episódio turístico em outro país, outra cultura, outro modo de viver a vida, viajar também pode ser uma jornada para dentro de si mesmo.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-11 col-sm-11 col-md-5 col-lg-5 m-1 rounded shadow colorPadrao" id="comentarios">
                    <div className="row d-flex px-0 py-3">
                        <div className="col-2 col-md-2 col-sm-2 col-lg-2 me-4">
                            <img src="/img/coment3.jpg"
                                className="d-flex mx-auto" alt="aldeia" />
                        </div>
                        <div className="col-12 col-md-12 col-sm-12 col-lg-9 text-wrap">
                            <h3 className="text-white">Rose Perreira</h3>
                            <hr className="my-2 text-white" />
                            <p className="fs-5 text-white">
                                Viajar tem a ver com viver experiências: quanto mais completa de passeios, culturas, aventuras, descobertas e imersões sua viagem for, mais rico fica seu repertório e mais valem os dias fora de casa.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-11 col-sm-11 col-md-5 col-lg-5 m-1 rounded shadow colorPadrao" id="comentarios">
                    <div className="row d-flex px-0 py-3">
                        <div className="col-2 col-md-2 col-sm-2 col-lg-2 me-4">

                            <img src="/img/coment4.jpg"
                                className="d-flex mx-auto" alt="aldeia" />
                        </div>
                        <div className="col-12 col-md-12 col-sm-12 col-lg-9 text-wrap ">
                            <h3 className="text-white">Izaquel Lopes</h3>
                            <hr className="my-2 text-white" />
                            <p className="fs-5 text-white">
                                Viajar é uma das melhores maneiras de expandir horizontes sobre a vida. Viajando, a gente pode não perceber, mas aprende muito sobre história, sociedade, valores, política, economia…
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Home