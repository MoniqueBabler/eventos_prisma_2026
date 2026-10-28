const API_URL = 'http://localhost:3000';

const formLogin = document.getElementById('formLogin');
const mensagem = document.getElementById('mensagem');

formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const resposta = await fetch(`${API_URL}/usuario/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            mensagem.textContent = dados.msg || 'E-mail ou senha inválidos.';
            return;
        }

        const usuario = dados.usuario || dados;

        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

        window.location.href = 'home.html';
    } catch (erro) {
        mensagem.textContent = 'Não foi possível conectar à API.';
        console.error(erro);
    }
});