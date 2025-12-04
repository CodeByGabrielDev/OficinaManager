let tabelaPecas;

$(document).ready(function () {
    tabelaPecas = $('#tabelaPecas').DataTable({
        language: { url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json' }
    });
});

//botao Salvar
document.getElementById('btnSalvarPeca').addEventListener('click', function() {

    const cod = document.getElementById('codPeca').value;
    const nome = document.getElementById('nomePeca').value;
    const qtd = parseInt(document.getElementById('qtdPeca').value); // Converte para número inteiro
    const preco = parseFloat(document.getElementById('precoPeca').value).toFixed(2); // Garante 2 casas decimais

    if(cod === "" || nome === "" || isNaN(qtd) || preco === "NaN") {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    // Status
    // Se tiver menos de 5 peças, avisa que o estoque está baixo
    let statusHtml = '';
    if (qtd === 0) {
        statusHtml = '<span class="badge bg-danger">Esgotado</span>';
    } else if (qtd < 5) {
        statusHtml = '<span class="badge bg-warning text-dark">Baixo Estoque</span>';
    } else {
        statusHtml = '<span class="badge bg-success">Em Estoque</span>';
    }

    //preço para R$
    const precoFormatado = `R$ ${preco.replace('.', ',')}`;

    //Botão de Ação
    const btnExcluir = '<button class="btn btn-sm btn-danger btn-excluir">Excluir</button>';

    //Adiciona na tabela
    tabelaPecas.row.add([
        cod,
        nome,
        qtd,
        precoFormatado,
        statusHtml,
        btnExcluir
    ]).draw(false);

    //Limpeza e Feedback
    bootstrap.Modal.getInstance(document.getElementById('modalPeca')).hide();
    document.getElementById('formPeca').reset();
    mostrarFeedback('Peça cadastrada com sucesso!', 'success');
});

// Botão Excluir
$('#tabelaPecas tbody').on('click', '.btn-excluir', function () {
    if(confirm('Tem certeza que deseja remover esta peça do estoque?')) {
        tabelaPecas.row($(this).parents('tr')).remove().draw();
        mostrarFeedback('Peça removida.', 'danger');
    }
});

// Função de mensagem
function mostrarFeedback(texto, tipo) {
    const box = document.getElementById('feedbackMensagem');
    box.className = `alert alert-${tipo}`;
    box.textContent = texto;
    box.style.display = 'block';

    setTimeout(() => {
        box.style.display = 'none';
    }, 3000);
}