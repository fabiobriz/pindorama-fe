import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/auth.service";
import { alterarUser } from "../../services/user.service";

function Username() {

    const [user, setUser] = useState();
    const [username, setUsername] = useState();
    const [validacao, setValidacao] = useState();
    const navigate = useNavigate();


    useEffect(() => {
        if (user === undefined) {
            async function fetchData() {
                const recebe = await getCurrentUser();
                setUser(recebe);
            }
            fetchData();
        }
    }, [user]);

    const alterarUsername = (e) => {
        e.preventDefault()
        setValidacao("");

        if (user !== null) {
            if (username === '') {
                document.getElementById("campos").innerHTML = "Preencha todos os campos."
            } else {
                document.getElementById("campos").innerHTML = ""
                alterarUser(user.id, username, null, null).then(() => {
                  alert("Username alterado com sucesso, é necessario relogar para que suas informações sejam atualizadas.")
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
        <div className="row mx-5">

            <h3>Alterar Username</h3>
            <form>
            <span id="campos" className="mb-3"> </span>
                {validacao && (
                    <span>
                        {validacao}
                    </span>
                )}
                {user && (
                    <>
                <div className="form-floating input-group mb-3">
                    <input className="form-control bg-transparent btn-outline-warning" readOnly={true} value={user.username} type="text" />
                    <div className="input-group-append">
                        <span className="h-100 input-group-text text-success font-weight-bold">✓</span>
                    </div>
                    <label className="form-label">Username:</label>
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control  bg-transparent btn-outline-warning" onChange={(e) => {setUsername(e.target.value)}}  type="text" />
                    <label className="form-label">Novo Username:</label>
                </div>
                <button type="submit" className="btn w-100 text-white colorPadrao btn-outline-warning" onClick={alterarUsername}>Alterar Username</button>
                </>
                )}

            </form>

        </div>
    )
}

export default Username