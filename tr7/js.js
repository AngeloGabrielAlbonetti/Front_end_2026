const produto = {
    "123": { "nome": "Jorge e Mateus", "preco": 9.0000 },
    "432": { "nome": "Fala Massa", "preco": 3.0000 },
    "789": { "nome": "Sabrina Capinter", "preco": 12.0000 },
    "147": { "nome": "Gaucho da fronteira", "preco": 90.5000 },
};

let carinho = [];

const audi = new Audio("bip.mp3");

window.onload = () => {
    document.getElementById("cod ").focus();
}


function Alertitem() {
    alert("Produto não encontrado!");
}


function addProduto() {
    console.log("produto adicionado");
    const codHtml = document.getElementById("cod ");
    const qtdHtml = document.getElementById("qtd ");

    const valorCod = codHtml.value;
    const valorQTD = parseInt(qtdHtml.value);

    if (!produto[valorCod]) {
        Alertitem();
        return;
    }

    const infoProduto = produto[valorCod];

    const item = {
        nome: infoProduto.nome,
        preco: infoProduto.preco,
        quantidade: valorQTD,
        subtot: infoProduto.preco * valorQTD
    };

    carinho.push(item);


    audi.currentTime = 0;
    audi.play();

    atualizarTela();

    qtdHtml.value = 1;
    codHtml.value = "";
    codHtml.focus();
}


function atualizarTela() {
    const lista = document.getElementById("lista ");
    const totalSpan = document.querySelector(".total ");
    const subSpan = document.getElementById("sub ");

    lista.innerHTML = "";

    let total = 0;

    carinho.forEach((item, index) => {
        total += item.subtot;

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
            <div>
                <strong>${item.nome}</strong><br>
                Qtd: ${item.quantidade} | R$ ${item.preco.toFixed(2)}
            </div>

            <div>
                <span class="me-3">R$ ${item.subtot.toFixed(2)}</span>
                <button class="btn btn-danger btn-sm" onclick="removerItem(${index})">X</button>
            </div>
        `;

        lista.appendChild(li);
    });

    totalSpan.innerText = total.toFixed(2);

    if (carinho.length > 0) {
        subSpan.innerText = carinho[carinho.length - 1].subtot.toFixed(2);
    } else {
        subSpan.innerText = "0.00";
    }
}

function removerItem(index) {
    carinho.splice(index, 1);
    atualizarTela();
}