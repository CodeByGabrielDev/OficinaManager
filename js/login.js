const loginForm = document.getElementById('loginForm');
const senhaInput = document.getElementById('senha');
const btnVerSenha = document.getElementById('btnVerSenha');
const msgErro = document.getElementById('mensagemErro');

//mostrar/ocultar Senha
btnVerSenha.addEventListener('click', () => {
    // Se o tipo for password, vira text. Se for text, vira password.
    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        btnVerSenha.textContent = '🙈';
    } else {
        senhaInput.type = 'password';
        btnVerSenha.textContent = '👁️';
    }
});

//logica de autenticacao
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // impede o formulário de recarregar a página

    const email = document.getElementById('email').value;
    const senha = senhaInput.value;

    //simulação com email unco e senha fixa
    if (email === 'admin@oficina.com' && senha === '123456') {
        // salva que o usuário entrou
        localStorage.setItem('usuarioLogado', 'true');
        // redireciona para o Dashboard
        window.location.href = 'dashboard.html';
    } else {
        msgErro.style.display = 'block';
        msgErro.textContent = 'E-mail ou senha incorretos!';
    }
});