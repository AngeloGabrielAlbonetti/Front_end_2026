const usuario = "angelogabrielalbonetti";
const repo = "Front_end_2026";
const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const container = document.getElementById("trabalhos");
const campoBusca = document.getElementById("busca");
const botaoOrdem = document.getElementById("ordem");
const contador = document.getElementById("contador");

let trabalhos = [];
let crescente = true;

const iconeSvg = `
<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <path d="m10 11-2 2 2 2M14 11l2 2-2 2"/>
</svg>`;


function mostrarEsqueletos() {
    container.innerHTML = "";
    for (let i = 0; i < 4; i++) {
        const e = document.createElement("div");
        e.className = "esqueleto";
        container.appendChild(e);
    }
    contador.textContent = "Carregando...";
}

function carregar() {
    mostrarEsqueletos();

    fetch(`https://api.github.com/repos/${usuario}/${repo}/contents`)
        .then(res => {
            if (!res.ok) throw new Error("Falha ao consultar o GitHub (" + res.status + ")");
            return res.json();
        })
        .then(data => {
            trabalhos = data
                .filter(item => item.type === "dir" && item.name.startsWith("tr"))
                .map(item => ({
                    nome: item.name,
                    numero: item.name.replace("tr", "")
                }));
            desenhar();
        })
        .catch(erro => {
            container.innerHTML = `
                <div class="mensagem">
                    <strong>Não foi possível carregar os trabalhos</strong>
                    ${erro.message}. Verifique a conexão e tente de novo.<br>
                    <button class="botao" type="button" id="tentar">Tentar novamente</button>
                </div>`;
            contador.textContent = "";
            document.getElementById("tentar").addEventListener("click", carregar);
        });
}


function desenhar() {
    const termo = campoBusca.value.trim().toLowerCase();

    const lista = trabalhos
        .filter(t => t.numero.toLowerCase().includes(termo) || ("trabalho " + t.numero).includes(termo))
        .sort((a, b) => {
            const diff = parseInt(a.numero, 10) - parseInt(b.numero, 10);
            const base = isNaN(diff) ? a.numero.localeCompare(b.numero) : diff;
            return crescente ? base : -base;
        });

    container.innerHTML = "";

    if (lista.length === 0) {
        container.innerHTML = `<div class="mensagem"><strong>Nenhum trabalho encontrado</strong>Tente outro número na busca.</div>`;
        contador.innerHTML = "<strong>0</strong> trabalhos";
        return;
    }

    lista.forEach((t, i) => {
        const link = document.createElement("a");
        link.className = "card";
        link.href = `https://${usuario}.github.io/${repo}/${t.nome}/`;
        link.target = "_blank";
        link.rel = "noopener";
        link.style.setProperty("--i", i);
        link.innerHTML = `
            <div class="icone">${iconeSvg}</div>
            <p class="nome">Trabalho ${t.numero}</p>
            <span class="abrir">Abrir projeto</span>`;

        link.addEventListener("pointermove", e => {
            const r = link.getBoundingClientRect();
            link.style.setProperty("--mx", (e.clientX - r.left) + "px");
            link.style.setProperty("--my", (e.clientY - r.top) + "px");
        });

   
        link.addEventListener("pointerdown", e => {
            const r = link.getBoundingClientRect();
            const o = document.createElement("span");
            o.className = "onda";
            o.style.width = o.style.height = "60px";
            o.style.left = (e.clientX - r.left - 30) + "px";
            o.style.top = (e.clientY - r.top - 30) + "px";
            link.appendChild(o);
            setTimeout(() => o.remove(), 650);
        });

        container.appendChild(link);
    });

    if (window.VanillaTilt && !reduzirMovimento) {
        VanillaTilt.init(container.querySelectorAll(".card"), {
            max: 14, speed: 400, scale: 1.05, perspective: 900
        });
    }

    const n = lista.length;
    contador.innerHTML = `<strong>${n}</strong> ${n === 1 ? "trabalho" : "trabalhos"}`;
}

campoBusca.addEventListener("input", desenhar);

botaoOrdem.addEventListener("click", () => {
    crescente = !crescente;
    botaoOrdem.textContent = "Ordem: " + (crescente ? "crescente" : "decrescente");
    desenhar();
});

carregar();


(function () {
    const alvo = document.getElementById("digitando");
    const frases = [
        "HTML, CSS e JavaScript na prática.",
        "Cada card abre um projeto publicado.",
        "Use a busca para achar um trabalho."
    ];
    if (reduzirMovimento) { alvo.textContent = frases[0]; return; }

    let f = 0, c = 0, apagando = false;
    function passo() {
        const frase = frases[f];
        alvo.textContent = frase.slice(0, c);
        if (!apagando && c === frase.length) { apagando = true; return setTimeout(passo, 1800); }
        if (apagando && c === 0) { apagando = false; f = (f + 1) % frases.length; }
        c += apagando ? -1 : 1;
        setTimeout(passo, apagando ? 25 : 55);
    }
    passo();
})();


const brilho = document.getElementById("brilho");
let mouse = { x: -999, y: -999 };

window.addEventListener("pointermove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    brilho.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});


(function () {
    if (reduzirMovimento) return;

    const canvas = document.getElementById("fundo");
    const ctx = canvas.getContext("2d");
    let largura, altura, pontos = [];

    function ajustar() {
        largura = canvas.width = window.innerWidth;
        altura = canvas.height = window.innerHeight;
        const qtd = Math.min(90, Math.floor(largura * altura / 17000));
        pontos = Array.from({ length: qtd }, () => ({
            x: Math.random() * largura,
            y: Math.random() * altura,
            vx: (Math.random() - .5) * .45,
            vy: (Math.random() - .5) * .45,
            r: Math.random() * 1.8 + .6
        }));
    }

    function animar() {
        ctx.clearRect(0, 0, largura, altura);

        for (const p of pontos) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > largura) p.vx *= -1;
            if (p.y < 0 || p.y > altura) p.vy *= -1;

        
            const dx = p.x - mouse.x, dy = p.y - mouse.y;
            const d = Math.hypot(dx, dy);
            if (d < 130) {
                p.x += dx / d * 1.6;
                p.y += dy / d * 1.6;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,106,0,.85)";
            ctx.fill();
        }

        for (let i = 0; i < pontos.length; i++) {
            for (let j = i + 1; j < pontos.length; j++) {
                const d = Math.hypot(pontos[i].x - pontos[j].x, pontos[i].y - pontos[j].y);
                if (d < 120) {
                    ctx.strokeStyle = `rgba(255,106,0,${(1 - d / 120) * .25})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(pontos[i].x, pontos[i].y);
                    ctx.lineTo(pontos[j].x, pontos[j].y);
                    ctx.stroke();
                }
            }
            // Liga ao mouse
            const dm = Math.hypot(pontos[i].x - mouse.x, pontos[i].y - mouse.y);
            if (dm < 170) {
                ctx.strokeStyle = `rgba(255,160,64,${(1 - dm / 170) * .6})`;
                ctx.beginPath();
                ctx.moveTo(pontos[i].x, pontos[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
        requestAnimationFrame(animar);
    }

    window.addEventListener("resize", ajustar);
    ajustar();
    animar();
})();


const botaoTopo = document.getElementById("topo");
window.addEventListener("scroll", () => {
    botaoTopo.classList.toggle("visivel", window.scrollY > 300);
});
botaoTopo.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));