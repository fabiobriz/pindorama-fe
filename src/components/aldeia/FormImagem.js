import { useState } from "react";
import { addImagemArt } from "../../services/artesanato.service";
import { addImagemPct } from "../../services/pacote.service";

function FormImagem({ id, titulo }) {

    const [imagem, setImagem] = useState(null);

    const enviarImagem = async (e) => {
        if (imagem !== null && id !== undefined && id !== null) {
            e.preventDefault()
            if(titulo === "Imagem Pacote"){
                await addImagemPct(imagem, id).then(() => {
                    window.location.reload();
                })
            }else if(titulo === "Imagem Artesanato"){
                await addImagemArt(imagem, id).then(() => {
                    window.location.reload();
                })
            }
        }
    }

    return (
        <form >
            <div className="form-group row justify-content-start">
                <input type="file" accept="image/*" onChange={(e) => setImagem(e.target.files[0])} />
            </div>
            <div className="form-group mt-3">
                <button className="btn colorPadrao btn-outline-warning text-white" onClick={enviarImagem}>Enviar Imagem</button>
            </div>
        </form>
    )
}

export default FormImagem