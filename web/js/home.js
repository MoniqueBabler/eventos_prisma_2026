
const API_URL = "http://localhost:3000";

const usuarioSalvo = localStorage.getItem("usuarioLogado");

if (!usuarioSalvo) {
    window.location.href = "index.html";
} else {
    iniciarHome();
}

function iniciarHome() {
    const usuario = JSON.parse(usuarioSalvo);

    const nomeUsuario = document.getElementById("nomeUsuario");
    const formEvento = document.getElementById("formEvento");
    const eventoId = document.getElementById("eventoId");
    const cidade = document.getElementById("cidade");
    const tipoEvento = document.getElementById("tipoEvento");
    const temperaturaMaxima = document.getElementById("temperaturaMaxima");
    const data = document.getElementById("data");
    const nivelImpacto = document.getElementById("nivelImpacto");
    const listaEventos = document.getElementById("eventos");
    const mensagem = document.getElementById("mensagem");
    const btnSalvar = document.getElementById("btnSalvar");
    const btnCancelar = document.getElementById("btnCancelar");
    const tituloFormulario = document.getElementById("tituloFormulario");
    const btnSair = document.getElementById("btnSair");

    if (
        !nomeUsuario ||
        !formEvento ||
        !eventoId ||
        !cidade ||
        !tipoEvento ||
        !temperaturaMaxima ||
        !data ||
        !nivelImpacto ||
        !listaEventos ||
        !mensagem ||
        !btnSalvar ||
        !btnCancelar ||
        !tituloFormulario ||
        !btnSair
    ) {
        console.error("Confira os IDs dos elementos no arquivo home.html.");
        return;
    }

    nomeUsuario.textContent = usuario.nome || usuario.email || "Usuário";

 

    tipoEvento.addEventListener("change", () => {
        const impacto = impactosSugeridos[tipoEvento.value];

        nivelImpacto.value = impacto || "";
    });

    btnSair.addEventListener("click", () => {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "index.html";
    });
    async function listarEventos() {
        try {
            const resposta = await fetch(`${API_URL}/evento`);
            const eventos = await resposta.json();

            if (!resposta.ok) {
                throw new Error(eventos.msg || "Erro ao carregar eventos.");
            }

            listaEventos.innerHTML = "";

            if (!Array.isArray(eventos) || eventos.length === 0) {
                listaEventos.textContent = "Nenhum evento cadastrado.";
                return;
            }

            eventos.forEach((evento) => {
                const card = document.createElement("article");
                card.className = "evento-card";

                const detalhes = document.createElement("div");
                detalhes.className = "evento-texto";

                const titulo = document.createElement("h3");
                titulo.textContent = `${evento.cidade} - ${evento.tipoEvento}`;

                const temperatura = document.createElement("p");
                const valorTemperatura =
                    evento.temperaturaMaxima == null
                        ? "Não informada"
                        : `${evento.temperaturaMaxima} °C`;

                temperatura.textContent =
                    `Temperatura máxima: ${valorTemperatura}`;

                const impacto = document.createElement("p");
                impacto.textContent = `Impacto: ${evento.nivelImpacto}`;

                const dataEvento = document.createElement("p");
                const dataFormatada = evento.data
                    ? new Date(evento.data).toLocaleDateString("pt-BR")
                    : "Não informada";

                dataEvento.textContent = `Data: ${dataFormatada}`;

                detalhes.append(
                    titulo,
                    temperatura,
                    impacto,
                    dataEvento
                );

                // Botão de editar
                const btnEditar = document.createElement("button");
                btnEditar.type = "button";
                btnEditar.textContent = "Editar";
                btnEditar.className = "btn-editar";

                btnEditar.addEventListener("click", () => {
                    editarEvento(evento);
                });

                const btnExcluir = document.createElement("button");
                btnExcluir.type = "button";
                btnExcluir.textContent = "Excluir";
                btnExcluir.className = "btn-excluir";

                btnExcluir.addEventListener("click", () => {
                    excluirEvento(evento);
                });

                const acoes = document.createElement("div");
                acoes.className = "acoes-evento";
                acoes.append(btnEditar, btnExcluir);

                card.append(detalhes, acoes);
                listaEventos.appendChild(card);
            });
        } catch (erro) {
            console.error(erro);
            listaEventos.textContent =
                "Erro ao carregar eventos. Confira se a API está funcionando.";
        }
    }

    formEvento.addEventListener("submit", async (event) => {
        event.preventDefault();

        const id = eventoId.value;

        const dadosEvento = {
            cidade: cidade.value.trim(),
            tipoEvento: tipoEvento.value,
            temperaturaMaxima:
                temperaturaMaxima.value === ""
                    ? null
                    : Number(temperaturaMaxima.value),
            data: data.value
                ? new Date(`${data.value}T12:00:00`).toISOString()
                : new Date().toISOString(),
            nivelImpacto: nivelImpacto.value.trim()
        };

        if (
            !dadosEvento.cidade ||
            !dadosEvento.tipoEvento ||
            !dadosEvento.nivelImpacto ||
            !data.value
        ) {
            mensagem.textContent = "Preencha todos os campos obrigatórios.";
            return;
        }

        if (dadosEvento.nivelImpacto.length > 100) {
            mensagem.textContent =
                "A descrição do impacto deve ter no máximo 100 caracteres.";
            return;
        }

        if (
            dadosEvento.temperaturaMaxima !== null &&
            !Number.isFinite(dadosEvento.temperaturaMaxima)
        ) {
            mensagem.textContent = "Informe uma temperatura válida.";
            return;
        }

        if (!id && !usuario.id) {
            mensagem.textContent =
                "Não foi possível identificar o usuário. Faça login novamente.";
            return;
        }

        if (!id) {
            dadosEvento.usuarioId = usuario.id;
        }

        const url = id
            ? `${API_URL}/evento/${id}`
            : `${API_URL}/evento`;

        try {
            const resposta = await fetch(url, {
                method: id ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosEvento)
            });

            const resultado = await resposta.json();

            if (!resposta.ok) {
                throw new Error(resultado.msg || "Erro ao salvar evento.");
            }

            mensagem.textContent = id
                ? "Evento atualizado com sucesso!"
                : "Evento cadastrado com sucesso!";

            limparFormulario();
            await listarEventos();
        } catch (erro) {
            console.error(erro);
            mensagem.textContent = erro.message;
        }
    });

    function editarEvento(evento) {
        eventoId.value = evento.id;
        cidade.value = evento.cidade;
        tipoEvento.value = evento.tipoEvento;
        temperaturaMaxima.value = evento.temperaturaMaxima ?? "";

        data.value = evento.data
            ? new Date(evento.data).toISOString().slice(0, 10)
            : "";

        nivelImpacto.value = evento.nivelImpacto || "";

        tituloFormulario.textContent = "Editar evento";
        btnSalvar.textContent = "Salvar alterações";
        btnCancelar.hidden = false;
        mensagem.textContent = "";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    async function excluirEvento(evento) {
        const confirmar = confirm(
            `Deseja excluir o evento ${evento.cidade} - ${evento.tipoEvento}?`
        );

        if (!confirmar) {
            return;
        }

        try {
            const resposta = await fetch(
                `${API_URL}/evento/${evento.id}`,
                {
                    method: "DELETE"
                }
            );

            const resultado = await resposta.json();

            if (!resposta.ok) {
                throw new Error(resultado.msg || "Erro ao excluir evento.");
            }

            mensagem.textContent = "Evento excluído com sucesso!";
            await listarEventos();
        } catch (erro) {
            console.error(erro);
            mensagem.textContent = erro.message;
        }
    }

    function limparFormulario() {
        formEvento.reset();
        eventoId.value = "";

        tituloFormulario.textContent = "Cadastrar evento";
        btnSalvar.textContent = "Cadastrar";
        btnCancelar.hidden = true;
        mensagem.textContent = "";
    }

    btnCancelar.addEventListener("click", limparFormulario);

    listarEventos();
}