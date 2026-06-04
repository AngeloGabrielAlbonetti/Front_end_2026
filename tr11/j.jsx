const { useState } = React;

function App() {
    const tamanho = 25;

    const barcos = [3, 8, 17];

    const [cliques, setCliques] = useState([]);
    const [mensagem, setMensagem] = useState("Encontre os 3 barcos!");

    function atacar(posicao) {
        if (cliques.includes(posicao)) return;

        const novosCliques = [...cliques, posicao];
        setCliques(novosCliques);

        const acertos = novosCliques.filter(c =>
            barcos.includes(c)
        ).length;

        if (acertos === barcos.length) {
            setMensagem("Você venceu!");
        }
    }

    return (
        <div>
            <h1>Batalha Naval</h1>
            <p>{mensagem}</p>

            <div className="tab">
                {Array.from({ length: tamanho }).map((_, i) => {
                    const clicado = cliques.includes(i);
                    const barco = barcos.includes(i);

                    let classe = "celula";
                    let texto = "~";

                    if (clicado) {
                        if (barco) {
                            texto = "🚢";
                        } else {
                            texto = "❌";
                        }
                    }

                    return (
                        <button
                            key={i}
                            className={classe}
                            onClick={() => atacar(i)}
                        >
                            {texto}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

ReactDOM.createRoot(
    document.getElementById("root")
).render(<App />);