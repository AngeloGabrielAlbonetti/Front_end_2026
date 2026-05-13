  document.getElementById('btnSimular').addEventListener('click', function() {
      const bandeira = document.getElementById('bandeira').value;
      const valor = Number(document.getElementById('valorVenda').value);
      const parcelas = Number(document.getElementById('parcelas').value);
      const tabela = document.getElementById('resumoBank');

      if (!bandeira || !valor || valor <= 0) {
          tabela.style.display = 'none';
          alert('Por favor, preencha a bandeira e o valor da venda.');
          return;
      }

      let taxaBandeiraPct;
      switch (bandeira) {
          case 'visa':
              taxaBandeiraPct = 0.02;
              break;
          case 'master':
              taxaBandeiraPct = 0.0185;
              break;
          case 'elo':
              taxaBandeiraPct = 0.03;
              break;
          default:
              taxaBandeiraPct = 0;
      }

      const taxaBandeira = valor * taxaBandeiraPct;
      const jurosTotais = valor * (0.0035 * parcelas);
      const taxaMensal = 12.50 * parcelas;
      const valorTotal = valor + taxaBandeira + jurosTotais + taxaMensal;
      const valorParcela = valorTotal / parcelas;

      const fmt = v => 'R$ ' + v.toFixed(2).replace('.', ',');

      document.getElementById('rTaxa').textContent = fmt(taxaBandeira);
      document.getElementById('rJuros').textContent = fmt(jurosTotais);
      document.getElementById('rMensal').textContent = fmt(taxaMensal);
      document.getElementById('rTotal').textContent = fmt(valorTotal);
      document.getElementById('rParcela').textContent = parcelas + 'x de ' + fmt(valorParcela);

      tabela.style.display = 'table';
  });