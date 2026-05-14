const pacotes = {
    standard: { nome: "Standard", preco: 50 },
    premium: { nome: "Premium", preco: 80 },
    deluxe: { nome: "Infinity Deluxe", preco: 120 }
};

document.getElementById("btnOrcamento").addEventListener("click", calcularOrcamento);

function calcularOrcamento() {
    const pacoteSelecionado = document.getElementById("pacoteEvento").value;
    const qtdPessoas = parseInt(document.getElementById("qtdPessoas").value);

    const resultadoDiv = document.getElementById("resultado-evento");
    const tabelaResumo = document.getElementById("resumoEvento");

    if (!pacoteSelecionado) {
        resultadoDiv.className = "resultado invalido";
        resultadoDiv.textContent = "⚠️ Por favor, selecione um pacote.";
        resultadoDiv.style.display = "block";
        tabelaResumo.style.display = "none";
        return;
    }

    if (!qtdPessoas || isNaN(qtdPessoas) || qtdPessoas <= 0) {
        resultadoDiv.className = "resultado invalido";
        resultadoDiv.textContent = "⚠️ Informe uma quantidade válida de pessoas.";
        resultadoDiv.style.display = "block";
        tabelaResumo.style.display = "none";
        return;
    }

    const pacote = pacotes[pacoteSelecionado];

    const custoBruto = pacote.preco * qtdPessoas;


    const taxaServico = custoBruto * 0.10;
    const totalComTaxa = custoBruto + taxaServico;


    const temDesconto = qtdPessoas > 100;
    const desconto = temDesconto ? totalComTaxa * 0.05 : 0;
    const totalFinal = totalComTaxa - desconto;


    resultadoDiv.style.display = "none";

    document.getElementById("rPacote").textContent = `${pacote.nome} — R$ ${pacote.preco.toFixed(2)}/pessoa`;
    document.getElementById("rQtd").textContent = `${qtdPessoas} pessoa${qtdPessoas > 1 ? "s" : ""}`;
    document.getElementById("rCustoBruto").textContent = `R$ ${custoBruto.toFixed(2)}`;
    document.getElementById("rTaxaServico").textContent = `R$ ${taxaServico.toFixed(2)}`;

    const rowDesconto = document.getElementById("rowDesconto");
    if (temDesconto) {
        rowDesconto.style.display = "";
        document.getElementById("rDesconto").textContent = `- R$ ${desconto.toFixed(2)}`;
    } else {
        rowDesconto.style.display = "none";
    }

    document.getElementById("rTotalEvento").textContent = `R$ ${totalFinal.toFixed(2)}`;

    tabelaResumo.style.display = "table";
}