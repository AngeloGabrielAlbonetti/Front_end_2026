// EXERCÍCIO 05: Gestão de Convidados VIP
// Sistema completo de gerenciamento de lista de convidados com manipulação de arrays e DOM

class GestorConvidados {
    constructor() {
        this.convidados = [];
        this.proximoId = 1;
        this.elementos = {
            inputNome: document.getElementById('nomeConvidado'),
            btnAdicionar: document.getElementById('btnAdicionarConvidado'),
            lista: document.getElementById('listaConvidados'),
            totalConvidados: document.getElementById('totalConvidados'),
            convidadosPresentes: document.getElementById('convidadosPresentes'),
            convidadosAguardando: document.getElementById('convidadosAguardando'),
            estadoConvidados: document.getElementById('estadoConvidados')
        };

        this.inicializar();
    }

    inicializar() {

        this.elementos.btnAdicionar.addEventListener('click', () => this.adicionarConvidado());


        this.elementos.inputNome.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.adicionarConvidado();
            }
        });


        this.renderizarLista();
    }

    adicionarConvidado() {

        const nome = this.elementos.inputNome.value.trim();


        if (nome === '') {
            alert('Por favor, digite um nome válido.');
            this.elementos.inputNome.focus();
            return;
        }

        if (this.convidados.some(c => c.nome.toLowerCase() === nome.toLowerCase())) {
            alert('Este convidado já foi adicionado à lista.');
            this.elementos.inputNome.focus();
            return;
        }


        const novoConvidado = {
            id: this.proximoId++,
            nome: nome,
            presente: false
        };


        this.convidados.push(novoConvidado);


        this.elementos.inputNome.value = '';
        this.elementos.inputNome.focus();

        this.renderizarLista();
        this.atualizarEstatisticas();
    }

    editarConvidado(id) {

        const convidado = this.convidados.find(c => c.id === id);

        if (!convidado) return;


        const novoNome = prompt(`Editar nome do convidado:\n(Atual: ${convidado.nome})`, convidado.nome).trim();


        if (novoNome === null || novoNome === '') {
            return;
        }


        if (this.convidados.some(c => c.nome.toLowerCase() === novoNome.toLowerCase() && c.id !== id)) {
            alert('Já existe um convidado com este nome.');
            return;
        }


        convidado.nome = novoNome;


        this.renderizarLista();
        this.atualizarEstatisticas();
    }

    alternarPresenca(id) {

        const convidado = this.convidados.find(c => c.id === id);

        if (!convidado) return;


        convidado.presente = !convidado.presente;


        this.renderizarLista();
        this.atualizarEstatisticas();
    }

    excluirConvidado(id) {

        const index = this.convidados.findIndex(c => c.id === id);

        if (index === -1) return;


        const convidado = this.convidados[index];
        if (confirm(`Tem certeza que deseja remover "${convidado.nome}" da lista?`)) {

            this.convidados.splice(index, 1);


            this.renderizarLista();
            this.atualizarEstatisticas();
        }
    }

    renderizarLista() {

        this.elementos.lista.innerHTML = '';


        if (this.convidados.length === 0) {
            this.elementos.lista.innerHTML = '<li class="vazio-message">Nenhum convidado adicionado ainda.</li>';
            return;
        }


        this.convidados.forEach(convidado => {
            const li = document.createElement('li');


            if (convidado.presente) {
                li.classList.add('presente');
            }


            li.innerHTML = `
                <span class="nome-convidado">${this.escaparHtml(convidado.nome)}</span>
                <div class="botoes-convidado">
                    <button class="btn-concluir" onclick="gestorConvidados.alternarPresenca(${convidado.id})" ${convidado.presente ? 'disabled' : ''}>
                        ${convidado.presente ? '✓ Presente' : 'Concluir'}
                    </button>
                    <button class="btn-editar" onclick="gestorConvidados.editarConvidado(${convidado.id})">Editar</button>
                    <button class="btn-excluir" onclick="gestorConvidados.excluirConvidado(${convidado.id})">Excluir</button>
                </div>
            `;

            this.elementos.lista.appendChild(li);
        });
    }

    atualizarEstatisticas() {
        const total = this.convidados.length;
        const presentes = this.convidados.filter(c => c.presente).length;
        const aguardando = total - presentes;


        this.elementos.totalConvidados.textContent = total;
        this.elementos.convidadosPresentes.textContent = presentes;
        this.elementos.convidadosAguardando.textContent = aguardando;


        if (total > 0) {
            this.elementos.estadoConvidados.style.display = 'block';
        } else {
            this.elementos.estadoConvidados.style.display = 'none';
        }
    }

    escaparHtml(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }
}

let gestorConvidados;

document.addEventListener('DOMContentLoaded', () => {
    gestorConvidados = new GestorConvidados();
});