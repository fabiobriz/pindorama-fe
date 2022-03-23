export function Desconto() {
    let valor = document.getElementById("Valor").value;

    let cupom = document.getElementById("Cupom").value;
    let descontoAplicado = false;
    valor = valor.replace(/,/g, "").replace(/\./g, "");

    let valorNovo = parseInt(valor);
    console.log(valorNovo);

    if (cupom.toUpperCase() === "SOMOSTODOSPINDORAMA") {
        valorNovo = valorNovo - (valorNovo * 0.05);
        descontoAplicado = true;

    } else if (cupom.toUpperCase() === "FERIAS") {
        valorNovo = valorNovo - (valorNovo * 0.10);
        descontoAplicado = true;

    } else if (cupom.toUpperCase() === "MAISCULTURA"){
        valorNovo = valorNovo - (valorNovo * 0.15);
        descontoAplicado = true;

    } else if (cupom.toUpperCase() === "CLIENTEVIP") {
        valorNovo = valorNovo - (valorNovo * 0.20);
        descontoAplicado = true;

    } else {
        document.getElementById("AspCp").innerHTML = "Cupom Inválido - Verifique Seu Cupom";

    }

    if (descontoAplicado === true) {
        var resultado = " " + valorNovo;

        if (resultado.length > 4) {
            resultado = resultado.substring(1, 2) + "." + resultado.substring(2, resultado.length);
            resultado += ",00"
        } else if (resultado.length <= 4) {

            resultado += ",00"
        }

        document.getElementById("Valor").value = resultado;
        document.getElementById("AspCp").innerHTML = "Cupom Aplicado - Aproveite bem sua Viagem";
    }
}

