const inputC = document.getElementById('celsius');
const inputF = document.getElementById('fahrenheit');

inputC.addEventListener('input', function() {
    if (this.value === '') {
        inputF.value = '';
        return;
    }
    const f = (parseFloat(this.value) * 9 / 5) + 32;
    inputF.value = f.toFixed(2);
});

inputF.addEventListener('input', function() {
    if (this.value === '') {
        inputC.value = '';
        return;
    }
    const c = (parseFloat(this.value) - 32) * 5 / 9;
    inputC.value = c.toFixed(2);
});