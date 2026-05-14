const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText !== '') {

        const newItem = document.createElement('li');

        newItem.innerHTML = `
        <span>${taskText}</span>

        <button onclick="editar(this)">Editar</button>
        <button onclick="delet(this)">Remover</button>
        <button onclick="completar(this)">Feito</button>
        `;

        taskList.appendChild(newItem);

        taskInput.value = '';
    }
}

function completar(button) {

    const li = button.parentElement;

    li.classList.toggle('completed');
}

function delet(button) {

    const li = button.parentElement;

    li.remove();
}

function editar(button) {

    const li = button.parentElement;

    const span = li.querySelector('span');

    const novoTexto = prompt('Editar tarefa:', span.innerText);

    if (novoTexto !== null && novoTexto.trim() !== '') {

        span.innerText = novoTexto;
    }
}