var tabelaVeiculos;

$(document).ready(function () {

    tabelaVeiculos = $('#tabelaVeiculos').DataTable({
        language: { 
            url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json' 
        }
    });

    carregarClientesNoSelect();
    carregarVeiculosNaTabela();
});

// Carregar clientes para o select
function carregarClientesNoSelect() {

    var select = document.getElementById("clienteVeiculo");

    select.innerHTML = '<option value="">Selecione...</option>';

    var clientes = JSON.parse(localStorage.getItem("clientes"));

    if (!clientes) {
        return;
    }

    for (var i = 0; i < clientes.length; i++) {

        var opcao = document.createElement("option");
        opcao.value = clientes[i].nome;
        opcao.textContent = clientes[i].nome;

        select.appendChild(opcao);
    }
}

// Salvar veículo
document.getElementById("btnSalvarVeiculo").addEventListener("click", function () {

    var placa = document.getElementById("placaVeiculo").value;
    var modelo = document.getElementById("modeloVeiculo").value;
    var ano = document.getElementById("anoVeiculo").value;
    var dono = document.getElementById("clienteVeiculo").value;

    if (placa === "" || modelo === "" || dono === "") {
        alert("Preencha os campos obrigatórios.");
        return;
    }

    var lista = JSON.parse(localStorage.getItem("veiculos"));

    if (!lista) {
        lista = [];
    }

    var veiculo = {
        placa: placa,
        modelo: modelo,
        ano: ano,
        dono: dono
    };

    lista.push(veiculo);
    localStorage.setItem("veiculos", JSON.stringify(lista));

    adicionarVeiculoNaTabela(veiculo);

    alert("Veículo cadastrado com sucesso!");

    bootstrap.Modal.getInstance(document.getElementById("modalVeiculo")).hide();
    document.getElementById("formVeiculo").reset();
});

// Adiciona veículo na tabela
function adicionarVeiculoNaTabela(v) {

    tabelaVeiculos.row.add([
        v.placa,
        v.modelo,
        v.ano,
        v.dono,
        '<button class="btn btn-danger btn-sm btn-excluir">Excluir</button>'
    ]).draw();
}

// Carrega lista salva no localStorage
function carregarVeiculosNaTabela() {

    var lista = JSON.parse(localStorage.getItem("veiculos"));

    if (!lista) {
        return;
    }

    for (var i = 0; i < lista.length; i++) {
        adicionarVeiculoNaTabela(lista[i]);
    }
}

// Excluir veículo
$('#tabelaVeiculos tbody').on('click', '.btn-excluir', function () {

    if (!confirm("Deseja excluir este veículo?")) {
        return;
    }

    var linha = tabelaVeiculos.row($(this).parents("tr"));
    var placa = linha.data()[0];

    var lista = JSON.parse(localStorage.getItem("veiculos"));
    var novaLista = [];

    for (var i = 0; i < lista.length; i++) {
        if (lista[i].placa !== placa) {
            novaLista.push(lista[i]);
        }
    }

    localStorage.setItem("veiculos", JSON.stringify(novaLista));

    linha.remove().draw();
});
