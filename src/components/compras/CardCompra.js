/* eslint-disable jsx-a11y/anchor-is-valid */
import './CardCompra.css'

function CardCompra({ id, titulo, descricao, preco, dataIda, dataVolta, InsImg }) {



    return (
        <>
        {InsImg ?(
            <img src={`data:${InsImg.mime_type};base64,${InsImg.dados}`} alt={titulo} />
        ):(
            <img alt={titulo}/>
        )}
            <div className="card-body">
                <h5 className="card-title text-center">{titulo}</h5>
                <p className="fs-6 m-0">R$: {preco}</p>
                {dataIda && (
                    <p className="fs-6 m-0">Data de Ida: {new Intl.DateTimeFormat({ day: 'numeric', month: 'long', year: 'numeric' }).format(Date.parse(dataIda.substr(0, 10)))}</p>
                )}
                {dataVolta && (
                    <p className="fs-6 m-0">Data de Volta: {new Intl.DateTimeFormat({ day: 'numeric', month: 'long', year: 'numeric' }).format(Date.parse(dataVolta.substr(0, 10)))}</p>
                )}
                <a className="fs-6 text-black-50" data-bs-toggle="collapse" href={"#Collapse" + id} role="button" aria-expanded="false" aria-controls={"#Collapse" + id}>
                    Leia mais sobre...
                </a>
                <hr />
                <div className="collapse mt-2" id={"Collapse" + id}>
                    <p className="fs-6">
                        {descricao}
                    </p>
                </div>
            </div>
        </>
    )
}

export default CardCompra