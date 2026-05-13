document.getElementById('cpf').addEventListener('input', function() {
    let v = this.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    this.value = v;
});

function validarCPF(cpf) {

    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cpf)) return false;


    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== parseInt(cpf[10])) return false;

    return true;
}

function validar() {
    const input = document.getElementById('cpf').value;
    const resultado = document.getElementById('resultado');

    if (input.replace(/\D/g, '').length === 0) {
        resultado.style.display = 'block';
        resultado.className = 'invalido';
        resultado.textContent = '⚠️ Por favor, digite um CPF.';
        return;
    }

    const valido = validarCPF(input);
    resultado.style.display = 'block';

    if (valido) {
        resultado.className = 'valido';
        resultado.textContent = '✔ CPF Válido!';
    } else {
        resultado.className = 'invalido';
        resultado.textContent = '✘ CPF Inválido!';
    }
}
document.getElementById('cpf').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') validar();
});