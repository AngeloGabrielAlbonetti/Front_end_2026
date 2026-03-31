const cria = document.getElementById("mainImage");
const boto = document.getElementById("btnImage");
const dia = "imagem fundo.png";
const noite = "fundo escuro.png";
let hrs = 0;

const estado = {
    normal: "ChatGPT Image 24 de mar. de 2026, 20_04_36.png",
    puto: "ChatGPT Image 24 de mar. de 2026, 20_04_48.png",
    morto: "ChatGPT Image 24 de mar. de 2026, 20_04_55.png",
    comendo: "ChatGPT Image 24 de mar. de 2026, 20_05_00.png",
    alimentado: "ChatGPT Image 24 de mar. de 2026, 20_04_36.png"

};


let con = 0;
let inter = null;
let Time_click = null;
let temi = null;

function atualizarFundo() {
    if (hrs) clearInterval(hrs);

    hrs = setInterval(() => {
        hrs++;
        console.log("hrs", hrs);
        if (hrs >= 12) {
            document.body.style.backgroundImage = `url('${noite}')`;
        } else {
            document.body.style.backgroundImage = `url('${dia}')`;
        }
        if (hrs >= 24) hrs = 0;

    }, 30000);
}

function Tema() {
    const atual = document.body.style.backgroundImage;

    if (atual.includes(noite)) {
        document.body.style.backgroundImage = `url('${dia}')`;
        hrs = 0;
    } else {
        document.body.style.backgroundImage = `url('${noite}')`;
        hrs = 12;
    }
}

function controle() {
    if (inter) clearInterval(inter);
    inter = setInterval(() => {
        con++;
        console.log("tempo", con);
        console.log("hrs", hrs);

        if (con == 30) {
            cria.src = estado.puto;
        }


        if (con == 60) {
            cria.src = estado.morto;
        }
    }, 1000);

}

function alime() {

    cria.src = estado.comendo;
    con = 0;
    console.log("comeu");

    if (Time_click) clearInterval(Time_click);

    Time_click = setTimeout(() => {
        cria.src = estado.alimentado;
        temi = setInterval(() => {
            cria.src = estado.normal;
        }, 2000);
    }, 1000);
}

Tema();
atualizarFundo();

controle();