// inicia tabela de clientes ao abrir a página
var tabelaClientes;

$(document).ready(function () {
    tabelaClientes = $('#tabelaClientes').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json'
        }
    });

    carregarClientesNaTabela();
});

// salva um cliente novo no localStorage
var botaoSalvar = document.getElementById("btnSalvarCliente");

botaoSalvar.addEventListener("click", function () {

    var nome = document.getElementById("nomeCliente").value;
    var telefone = document.getElementById("telefoneCliente").value;
    var cidade = document.getElementById("localidade").value;

    // impede salvar com campos vazios
    if (nome.trim() === "" || telefone.trim() === "") {
        alert("Preencha nome e telefone.");
        return;
    }

    // carrega lista existente para adicionar o novo
    var lista = JSON.parse(localStorage.getItem("clientes"));
    if (!lista) lista = [];

    // cria objeto cliente
    var cliente = { nome: nome, telefone: telefone, cidade: cidade };

    lista.push(cliente);

    // salva no localStorage
    localStorage.setItem("clientes", JSON.stringify(lista));

    // coloca na tabela visual
    adicionarClienteNaTabela(cliente);

    alert("Cliente salvo!");

    // fecha modal e limpa o formulário
    bootstrap.Modal.getInstance(document.getElementById("modalCliente")).hide();
    document.getElementById("formCliente").reset();
});

// adiciona 1 cliente na tabela exibida
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

// carrega todos os clientes salvos no localStorage
function carregarClientesNaTabela() {
    var lista = JSON.parse(localStorage.getItem("clientes"));
    if (!lista) return;

    for (var i = 0; i < lista.length; i++) {
        adicionarClienteNaTabela(lista[i]);
    }
}

// exclui cliente da tabela e do localStorage
$('#tabelaClientes tbody').on('click', '.btn-excluir', function () {

    if (!confirm("Tem certeza que deseja excluir?")) return;

    var linha = tabelaClientes.row($(this).parents('tr'));
    var dados = linha.data();
    var nome = dados[0];

    // remove da lista no localStorage
    var lista = JSON.parse(localStorage.getItem("clientes"));
    var novaLista = [];

    for (var i = 0; i < lista.length; i++) {
        if (lista[i].nome !== nome) novaLista.push(lista[i]);
    }

    localStorage.setItem("clientes", JSON.stringify(novaLista));

    linha.remove().draw();
});

// abre modal com informações para edição
$('#tabelaClientes tbody').on('click', '.btn-editar', function () {

    var linha = tabelaClientes.row($(this).parents('tr'));
    var dados = linha.data();

    // preenche o formulário com o cliente escolhido
    document.getElementById("nomeCliente").value = dados[0];
    document.getElementById("telefoneCliente").value = dados[2];
    document.getElementById("localidade").value = dados[3];

    var modal = new bootstrap.Modal(document.getElementById("modalCliente"));
    modal.show();

    // troca texto do botão para indicar edição
    botaoSalvar.innerText = "Salvar Alterações";

    // função temporária para atualizar o cliente
    botaoSalvar.onclick = function () {

        dados[0] = document.getElementById("nomeCliente").value;
        dados[2] = document.getElementById("telefoneCliente").value;
        dados[3] = document.getElementById("localidade").value;

        linha.data(dados).draw();

        botaoSalvar.innerText = "Salvar";

        salvarTabelaNoLocalStorage();

        modal.hide();
        document.getElementById("formCliente").reset();

        // restaura a função original do botão
        botaoSalvar.onclick = function () { location.reload(); }
    };
});

// salva toda a tabela de volta no localStorage
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

// busca CEP no ViaCEP e preenche endereço automaticamente
var campoCep = document.getElementById("cep");

campoCep.addEventListener("blur", function () {

    var cep = campoCep.value.replace(/\D/g, "");

    if (cep.length !== 8) return;

    var url = "https://viacep.com.br/ws/" + cep + "/json/";

    fetch(url)
        .then(function (response) { return response.json(); })
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
