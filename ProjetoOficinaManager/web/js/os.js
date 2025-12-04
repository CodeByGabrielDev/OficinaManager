var tabelaOS;
var contadorId = 102;

$(document).ready(function () {
    tabelaOS = $('#tabelaOS').DataTable({
        language: { url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json' },
        order: [[0, 'desc']]
    });

    carregarClientes();
});

// carregar clientes no select
function carregarClientes() {
    var select = document.getElementById("clienteOS");
    select.innerHTML = "<option value=''>Selecione...</option>";

    var lista = JSON.parse(localStorage.getItem("clientes"));

    if (!lista) return;

    for (var i = 0; i < lista.length; i++) {
        var op = document.createElement("option");
        op.value = lista[i].nome;
        op.textContent = lista[i].nome;
        select.appendChild(op);
    }
}

document.getElementById("btnSalvarOS").addEventListener("click", function () {

    var cliente = document.getElementById("clienteOS").value;
    var veiculo = document.getElementById("veiculoOS").value;
    var desc = document.getElementById("descricaoOS").value;
    var status = document.getElementById("statusOS").value;

    if (cliente === "" || veiculo === "" || desc === "") {
        alert("Preencha todos os campos.");
        return;
    }

    var badge =
        status === "Aberta" ? "bg-primary" :
        status === "Em Andamento" ? "bg-warning text-dark" :
        "bg-success";

    var linha = [
        contadorId,
        cliente,
        veiculo,
        desc,
        '<span class="badge ' + badge + '">' + status + '</span>',
        '<button class="btn btn-sm btn-success btn-concluir">Concluir</button>' +
        '<button class="btn btn-sm btn-danger btn-excluir">Excluir</button>'
    ];

    tabelaOS.row.add(linha).draw();

    contadorId++;

    bootstrap.Modal.getInstance(document.getElementById("modalOS")).hide();
    document.getElementById("formOS").reset();
});

// excluir os
$('#tabelaOS tbody').on('click', '.btn-excluir', function () {
    if (confirm("Excluir esta OS?")) {
        tabelaOS.row($(this).parents("tr")).remove().draw();
    }
});

// concluir os
$('#tabelaOS tbody').on('click', '.btn-concluir', function () {
    var linha = tabelaOS.row($(this).parents('tr'));
    var dados = linha.data();
    dados[4] = '<span class="badge bg-success">Concluída</span>';
    linha.data(dados).draw();
});

// =============================
// CARREGAR VEÍCULOS NO SELECT
// =============================
function carregarVeiculos() {
    var select = document.getElementById("veiculoOS");
    select.innerHTML = "<option value=''>Selecione...</option>";

    var lista = JSON.parse(localStorage.getItem("veiculos"));

    if (!lista) {
        return;
    }

    for (var i = 0; i < lista.length; i++) {
        var texto = lista[i].modelo + " (" + lista[i].placa + ")";
        var option = document.createElement("option");
        option.value = texto;
        option.textContent = texto;
        select.appendChild(option);
    }
}
var modalOS = document.getElementById("modalOS");

modalOS.addEventListener("show.bs.modal", function () {
    carregarClientes();
    carregarVeiculos();
});
