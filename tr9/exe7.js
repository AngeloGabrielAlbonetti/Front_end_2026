const SETORES_MII = {
    "0": "ISO / Uso Futuro",
    "1": "Companhias Aéreas",
    "2": "Companhias Aéreas / Financeiro",
    "3": "Viagens e Entretenimento",
    "4": "Bancos e Finanças",
    "5": "Bancos e Finanças",
    "6": "Merchandising e Bancos",
    "7": "Combustível e Petróleo",
    "8": "Telecomunicações",
    "9": "Governo e Nacional"
};


const EMISSORES = [
    { prefixo: "4011", banco: "Banco do Brasil" },
    { prefixo: "4514", banco: "Itaú Unibanco" },
    { prefixo: "5176", banco: "Banco do Brasil" },
    { prefixo: "5277", banco: "Bradesco" },
    { prefixo: "5404", banco: "Nubank" },
    { prefixo: "5432", banco: "Caixa Econômica Federal" },
    { prefixo: "5066", banco: "Elo / Banco do Brasil" },
    { prefixo: "6362", banco: "Banco do Brasil (Elo)" },
    { prefixo: "3714", banco: "American Express" },
    { prefixo: "3787", banco: "American Express" },
    { prefixo: "3841", banco: "Hipercard / Itaú" },
    { prefixo: "6062", banco: "Hipercard / Bradesco" },
    { prefixo: "4000", banco: "Chase Bank (EUA)" },
    { prefixo: "4111", banco: "Banco Teste / Sandbox" },
    { prefixo: "5555", banco: "Mastercard Global Test" },
    { prefixo: "3782", banco: "American Express" },
];


const TIPOS_PRODUTO = [
    { faixaInicio: 600, faixaFim: 609, tipo: "Pré-pago" },
    { faixaInicio: 610, faixaFim: 619, tipo: "Débito" },
    { faixaInicio: 620, faixaFim: 699, tipo: "Crédito" },
    { faixaInicio: 700, faixaFim: 749, tipo: "Crédito Premium" },
    { faixaInicio: 750, faixaFim: 799, tipo: "Crédito Corporativo" },
    { faixaInicio: 800, faixaFim: 849, tipo: "Pré-pago / Gift Card" },
    { faixaInicio: 850, faixaFim: 899, tipo: "Débito Empresarial" },
    { faixaInicio: 900, faixaFim: 999, tipo: "Crédito Internacional" },
];



function detectarBandeira(numero) {
    if (/^4/.test(numero)) return { nome: "Visa", classe: "bandeira-visa" };
    if (/^5[1-5]/.test(numero)) return { nome: "Mastercard", classe: "bandeira-master" };
    if (/^(222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)/.test(numero))
        return { nome: "Mastercard (2-série)", classe: "bandeira-master" };
    if (/^3[47]/.test(numero)) return { nome: "American Express", classe: "bandeira-amex" };
    if (/^(636368|438935|504175|451416|636297|5067|4576|4011)/.test(numero))
        return { nome: "Elo", classe: "bandeira-elo" };
    if (/^(606282|3841)/.test(numero)) return { nome: "Hipercard", classe: "bandeira-hiper" };
    if (/^6(?:011|5)/.test(numero)) return { nome: "Discover", classe: "bandeira-desconhecida" };
    if (/^(?:2131|1800|35)/.test(numero)) return { nome: "JCB", classe: "bandeira-desconhecida" };
    return { nome: "Desconhecida", classe: "bandeira-desconhecida" };
}



function luhn(numero) {

    const digitos = numero.split("").reverse().map(Number);
    let soma = 0;

    for (let i = 0; i < digitos.length; i++) {
        let d = digitos[i];

        if (i % 2 === 1) {
            d *= 2;
            if (d > 9) d -= 9;
        }
        soma += d;
    }


    return soma % 10 === 0;
}



function detectarEmissor(numero) {
    for (const item of EMISSORES) {
        if (numero.startsWith(item.prefixo)) return item.banco;
    }

    const mii = numero[0];
    const fallbacks = {
        "3": "Emissor Internacional (Amex/JCB/Diners)",
        "4": "Emissor Visa não mapeado",
        "5": "Emissor Mastercard não mapeado",
        "6": "Emissor Elo/Discover não mapeado",
    };
    return fallbacks[mii] || "Emissor não identificado";
}



function detectarProduto(numero) {
    if (numero.length < 8) return "Dados insuficientes";
    const cod = parseInt(numero.substring(5, 8)); // dígitos 6,7,8 (base 0: índices 5,6,7)
    for (const p of TIPOS_PRODUTO) {
        if (cod >= p.faixaInicio && cod <= p.faixaFim) return p.tipo;
    }
    return "Produto não classificado";
}



document.getElementById("btnAnalisar").addEventListener("click", analisarCartao);


document.getElementById("numCartao").addEventListener("input", function() {
    let val = this.value.replace(/\D/g, "").substring(0, 16);
    this.value = val.replace(/(.{4})/g, "$1 ").trim();
});


document.getElementById("numCartao").addEventListener("keydown", function(e) {
    if (e.key === "Enter") analisarCartao();
});

function analisarCartao() {
    const raw = document.getElementById("numCartao").value.replace(/[\s.]/g, "");
    const painel = document.getElementById("painelCartao");
    const header = document.getElementById("painelHeader");
    const painelStatus = document.getElementById("painelStatus");
    const painelTitulo = document.getElementById("painelTitulo");

    if (!/^\d{13,16}$/.test(raw)) {
        painel.style.display = "block";
        header.className = "painel-header invalido";
        painelTitulo.textContent = "⚠️ Número inválido";
        painelStatus.textContent = "ERRO";
        document.getElementById("infosBandeira").textContent = "—";
        document.getElementById("infosBandeira").className = "value";
        document.getElementById("infosSetor").textContent = "Insira entre 13 e 16 dígitos numéricos.";
        document.getElementById("infosEmissor").textContent = "—";
        document.getElementById("infosProduto").textContent = "—";
        return;
    }

    const valido = luhn(raw);
    const bandeira = detectarBandeira(raw);
    const setor = SETORES_MII[raw[0]] || "Setor não identificado";
    const emissor = detectarEmissor(raw);
    const produto = detectarProduto(raw);


    painel.style.display = "block";

    if (valido) {
        header.className = "painel-header valido";
        painelTitulo.textContent = "✅ Cartão Válido";
        painelStatus.textContent = "LUHN OK";
    } else {
        header.className = "painel-header invalido";
        painelTitulo.textContent = "❌ Cartão Inválido";
        painelStatus.textContent = "LUHN FALHOU";
    }

    document.getElementById("infosBandeira").textContent = bandeira.nome;
    document.getElementById("infosBandeira").className = "value " + bandeira.classe;
    document.getElementById("infosSetor").textContent = setor;
    document.getElementById("infosSetor").className = "value";
    document.getElementById("infosEmissor").textContent = emissor;
    document.getElementById("infosEmissor").className = "value";
    document.getElementById("infosProduto").textContent = produto;
    document.getElementById("infosProduto").className = "value";
}