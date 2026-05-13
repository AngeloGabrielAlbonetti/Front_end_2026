 document.getElementById('btnMedia').addEventListener('click', function() {
     const nome = document.getElementById('nomeAluno').value.trim();
     const n1 = Number(document.getElementById('nota1').value);
     const n2 = Number(document.getElementById('nota2').value);
     const n3 = Number(document.getElementById('nota3').value);
     const res = document.getElementById('resultado-notas');

     if (!nome) {
         res.style.display = 'block';
         res.className = 'resultado reprovado';
         res.innerHTML = '⚠️ Por favor, informe o nome do aluno.';
         return;
     }

     const media = (n1 + n2 + n3) / 3;
     res.style.display = 'block';

     if (media >= 7.0) {
         res.className = 'resultado aprovado';
         res.innerHTML = '✔ ' + nome + '<br>Média: ' + media.toFixed(2) + '<br>Situação: <strong>Aprovado</strong>';
     } else if (media >= 4.0) {
         const falta = (10 - media).toFixed(2);
         res.className = 'resultado exame';
         res.innerHTML = '📋 ' + nome + '<br>Média: ' + media.toFixed(2) + '<br>Situação: <strong>Exame</strong><br>Faltam <strong>' + falta + '</strong> pontos para 10';
     } else {
         res.className = 'resultado reprovado';
         res.innerHTML = '✘ ' + nome + '<br>Média: ' + media.toFixed(2) + '<br>Situação: <strong>Reprovado</strong>';
     }
 });