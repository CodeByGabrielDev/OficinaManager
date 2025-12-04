// =========================
// INICIALIZA O DATATABLE
// =========================
var tabelaClientes;

$(document).ready(function () {
    tabelaClientes = $('#tabelaClientes').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json'
        }
    });

    carregarClientesNaTabela();
});

// =========================
// SALVAR CLIENTE
// =========================
var botaoSalvar = document.getElementById("btnSalvarCliente");

botaoSalvar.addEventListener("click", function () {

    var nome = document.getElementById("nomeCliente").value;
    var telefone = document.getElementById("telefoneCliente").value;
    var cidade = document.getElementById("localidade").value;

    if (nome.trim() === "" || telefone.trim() === "") {
        alert("Preencha nome e telefone.");
        return;
    }

    // Carrega lista existente
    var lista = JSON.parse(localStorage.getItem("clientes"));

    if (!lista) {
        lista = [];
    }

    // OBJETO CLIENTE
    var cliente = {
        nome: nome,
        telefone: telefone,
        cidade: cidade
    };

    lista.push(cliente);

    // Salvar
    localStorage.setItem("clientes", JSON.stringify(lista));

    // Atualizar tabela
    adicionarClienteNaTabela(cliente);

    alert("Cliente salvo!");

    // Fechar modal
    bootstrap.Modal.getInstance(document.getElementById("modalCliente")).hide();

    document.getElementById("formCliente").reset();
});

// =========================
// ADICIONAR NA TABELA
// =========================
function adicionarClienteNaTabela(cliente) {
    tabelaClientes.row.add([
        cliente.nome,
        "email@gmail.com",
        cliente.telefone,
        cliente.cidade,
        '<button class="btn btn-warning btn-sm me-2 btn-editar">Editar</button>' +
        '<button class="btn btn-danger btn-sm btn-excluir">Excluir</button>'
    ]).draw();
}

// =========================
// CARREGAR CLIENTES SALVOS
// =========================
function carregarClientesNaTabela() {

    var lista = JSON.parse(localStorage.getItem("clientes"));

    if (!lista) {
        return;
    }

    for (var i = 0; i < lista.length; i++) {
        adicionarClienteNaTabela(lista[i]);
    }
}

// =========================
// EXCLUIR CLIENTE
// =========================
$('#tabelaClientes tbody').on('click', '.btn-excluir', function () {

    if (!confirm("Tem certeza que deseja excluir?")) {
        return;
    }

    var linha = tabelaClientes.row($(this).parents('tr'));
    var dados = linha.data();

    var nome = dados[0];

    // Remove do localStorage
    var lista = JSON.parse(localStorage.getItem("clientes"));

    var novaLista = [];

    for (var i = 0; i < lista.length; i++) {
        if (lista[i].nome !== nome) {
            novaLista.push(lista[i]);
        }
    }

    localStorage.setItem("clientes", JSON.stringify(novaLista));

    linha.remove().draw();
});

// =========================
// EDITAR CLIENTE
// =========================
$('#tabelaClientes tbody').on('click', '.btn-editar', function () {

    var linha = tabelaClientes.row($(this).parents('tr'));
    var dados = linha.data();

    document.getElementById("nomeCliente").value = dados[0];
    document.getElementById("telefoneCliente").value = dados[2];
    document.getElementById("localidade").value = dados[3];

    var modal = new bootstrap.Modal(document.getElementById("modalCliente"));
    modal.show();

    // SUBSTITUI O BOTÃO SALVAR TEMPORARIAMENTE
    botaoSalvar.innerText = "Salvar Alterações";

    botaoSalvar.onclick = function () {

        dados[0] = document.getElementById("nomeCliente").value;
        dados[2] = document.getElementById("telefoneCliente").value;
        dados[3] = document.getElementById("localidade").value;

        linha.data(dados).draw();

        botaoSalvar.innerText = "Salvar";

        salvarTabelaNoLocalStorage();

        modal.hide();

        document.getElementById("formCliente").reset();

        // restaura função original
        botaoSalvar.onclick = function () { location.reload(); }
    };
});

// Salva tabela inteira no localStorage
function salvarTabelaNoLocalStorage() {
    var lista = [];
    tabelaClientes.rows().every(function () {
        var d = this.data();
        lista.push({
            nome: d[0],
            telefone: d[2],
            cidade: d[3]
        });
    });
    localStorage.setItem("clientes", JSON.stringify(lista));
}

// =========================
// BUSCA CEP AUTOMÁTICO (ViaCEP)
// =========================

var campoCep = document.getElementById("cep");

campoCep.addEventListener("blur", function () {

    var cep = campoCep.value.replace(/\D/g, ""); // remove tudo que não é número

    if (cep.length !== 8) {
        return; // evita erro
    }

    var url = "https://viacep.com.br/ws/" + cep + "/json/";

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (dados) {
            if (dados.erro) {
                alert("CEP não encontrado.");
            } else {
                document.getElementById("logradouro").value = dados.logradouro;
                document.getElementById("localidade").value = dados.localidade;
                document.getElementById("uf").value = dados.uf;
            }
        })
        .catch(function () {
            alert("Erro ao consultar CEP.");
        });
});
