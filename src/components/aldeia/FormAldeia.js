import React, { useState, useEffect } from 'react';
import { buscarAldeia, createAldeia, deleteAldeia, updateAldeia } from "../../services/aldeia.service";
import { getCurrentUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

function FormAldeia({ id, titulo }) {

    const [nome, setNome] = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [telefone, setTelefone] = useState('')
    const [estado, setEstado] = useState()
    const [cidade, setCidade] = useState('')
    const [bairro, setBairro] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')
    const [validacao, setValidacao] = useState();
    const [read, setRead] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if ((id !== "" && titulo !== "") && (id !== undefined && titulo !== undefined)) {
            async function fetchData() {
                const res = await buscarAldeia(id);
                setRead(titulo === "Apagar Dados" ? true : false);
                setNome(res.nome);
                setResponsavel(res.responsavel);
                setTelefone(res.telefone);
                setEstado(res.endereco.estado);
                setCidade(res.endereco.cidade);
                setBairro(res.endereco.bairro);
                setLogradouro(res.endereco.logradouro);
                setNumero(res.endereco.numero);
                setComplemento(res.endereco.complemento);
            }
            fetchData();

        }
    }, [id, titulo]);




    const validarCadastro = (e) => {
        e.preventDefault()
        setValidacao("");

        const userlogado = getCurrentUser();

        if (userlogado !== null && userlogado.roles.includes("ROLE_ALDEIA")) {
            if (id !== '' && titulo !== "Apagar Dados") {
                if (nome === '' || responsavel === '' || telefone === '' || estado === '' || cidade === '' || bairro === '' || numero === '' || logradouro === '') {
                    document.getElementById("campos").innerHTML = "Preencha todos os campos."
                    document.getElementById("estado").innerHTML = ""

                } else if (estado === 'Escolha o tipo') {
                    document.getElementById("estado").innerHTML = "Escolha seu estado."
                    document.getElementById("campos").innerHTML = ""
                    document.getElementById("confirm").innerHTML = ""

                } else {
                    document.getElementById("estado").innerHTML = ""
                    document.getElementById("campos").innerHTML = ""

                    const endereco = { estado, cidade, bairro, logradouro, numero, complemento };

                    const user = { id: userlogado.id };
                    if (titulo === "Alterar Dados" && id !== "") {
                        updateAldeia(id, nome, responsavel, telefone, endereco).then(() => {
                            navigate("/GerenciarConta");
                            window.location.reload();

                        }, (error) => {
                            const msgErro = (error.response &&
                                error.response.data && error.response.data.message) || error.message || error.toString();
                            setValidacao(msgErro);
                        });
                    } else {
                        createAldeia(nome, responsavel, telefone, endereco, user).then(() => {
                            navigate("/");
                            window.location.reload();
                        }, (error) => {
                            const msgErro = (error.response &&
                                error.response.data && error.response.data.message) || error.message || error.toString();
                            setValidacao(msgErro);
                        });
                    }

                }
            } else if (id !== undefined && titulo === "Apagar Dados") {
                deleteAldeia(id).then(() => {
                    navigate("/");
                    window.location.reload();

                }, (error) => {
                    const msgErro = (error.response &&
                        error.response.data && error.response.data.message) || error.message || error.toString();
                    setValidacao(msgErro);
                });
            }
        } else {
            navigate("/");
            window.location.reload();
        }


    }


    return (
        <form>
            <span id="campos" className="mb-3"> </span>
            {validacao && (
                <span>
                    {validacao}
                </span>
            )}

            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 mx-auto">
                    <div className="form-group mb-3">
                        <div className="row">
                            <div className="col-5 col-sm-4 col-md-4 col-lg-5 border border-1 border-warning rounded ">
                                <label className="control-label mt-1 text-center">
                                    Nome da Aldeia:
                                </label>
                            </div>
                            <div className="col-7 col-sm-8 col-md-8 col-lg-7">
                                <input className="form-control bg-transparent btn-outline-warning" value={nome} onChange={(e) => setNome(e.target.value)} readOnly={read} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <div className="row">
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 border border-1 border-warning rounded ">
                                <label className="control-label mt-1"> Responsável:</label>
                            </div>
                            <div className="col-8 col-sm-8 col-md-8 col-lg-8">
                                <input type="text" className="form-control bg-transparent btn-outline-warning" value={responsavel} onChange={(e) => setResponsavel(e.target.value)} readOnly={read} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <div className="row">
                            <div className="col-4 col-sm-3 col-md-3 col-lg-3 border border-1 border-warning rounded ">
                                <label className="control-label mt-1 text-center">
                                    Celular:
                                </label>
                            </div>
                            <div className="col-8 col-sm-9 col-md-9 col-lg-8">
                                <input className="form-control bg-transparent btn-outline-warning" value={telefone} onChange={(e) => setTelefone(e.target.value)} readOnly={read} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <div className="row">
                            <div className="col-4 col-sm-2 col-md-3 col-lg-3 border border-1 border-warning rounded ">
                                <label className="control-label mt-1">Estado:</label>
                            </div>
                            <div className="col-4 col-sm-4 col-md-2 col-lg-4">
                                <select className="text-center bg-transparent btn-outline-warning rounded py-2" id="estados" value={estado} onChange={(e) => setEstado(e.target.value)} readOnly={read}>
                                    <option value="Escolha seu estado">Escolha seu estado</option>
                                    <option value="AC">Acre</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                    <option value="EX">Estrangeiro</option>
                                </select>
                            </div>
                            <span id="estado"></span>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <div className="row">
                            <div className="col-4 col-sm-3 col-md-4 col-lg-3 border border-1 border-warning rounded ">
                                <label className="control-label mt-1">Cidade:</label>
                            </div>
                            <div className="col-8 col-sm-9 col-md-8 col-lg-9">
                                <input type="text" className="form-control bg-transparent btn-outline-warning" value={cidade} onChange={(e) => setCidade(e.target.value)} readOnly={read} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 mx-auto">
                    <div className="form-group mb-3">
                        <div className="row">
                            <div className="col-4 col-sm-2 col-md-4 col-lg-3 border border-1 border-warning rounded ">
                                <label className="control-label mt-1">Bairro:</label>
                            </div>
                            <div className="col-8 col-sm-10 col-md-8 col-lg-9">
                                <input type="text" className="form-control bg-transparent btn-outline-warning" value={bairro} onChange={(e) => setBairro(e.target.value)} readOnly={read} />
                            </div>
                        </div>
                    </div>

                    <div className="form-group mb-3">
                        <div className="row">
                            <div className="col-4 col-sm-3 col-md-4 col-lg-4 border border-1 border-warning rounded ">
                                <label className="control-label mt-1">Logradouro:</label>
                            </div>
                            <div className="col-8 col-sm-9 col-md-8 col-lg-8">
                                <input type="text" className="form-control bg-transparent btn-outline-warning" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} readOnly={read} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <div className="row">
                            <div className="col-4 col-sm-2 col-md-4 col-lg-3 border border-1 border-warning rounded ">
                                <label className="control-label mt-1">Numero:</label>
                            </div>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                                <input type="text" className="form-control bg-transparent btn-outline-warning" value={numero} onChange={(e) => setNumero(e.target.value)} readOnly={read} />
                            </div>
                        </div>
                    </div>

                    <div className="form-group mb-3">
                        <div className="row">
                            <div className="col-4 col-sm-3 col-md-4 col-lg-5 border border-1 border-warning rounded ">
                                <label className="control-label mt-1">Complemento:</label>
                            </div>
                            <div className="col-8 col-sm-9 col-md-8 col-lg-7">
                                <input type="text" className="form-control bg-transparent btn-outline-warning" value={complemento} onChange={(e) => setComplemento(e.target.value)} readOnly={read} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row justify-content-center">
                    <div className="col-10 col-sm-6 col-md-4 col-lg-3">
                        <button className="btn w-100 btn-lg colorPadrao btn-outline-warning text-white" onClick={validarCadastro}>{titulo ? (
                            titulo.substr(0, titulo.indexOf(" "))
                        ) : (
                            "Cadastrar"
                        )}</button>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default FormAldeia