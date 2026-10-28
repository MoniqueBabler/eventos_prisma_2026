
const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    try {
        const data = req.body;

        const item = await prisma.usuario.create({
            data
        });

        return res.status(201).json(item);
    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            msg: "Erro ao cadastrar usuário."
        });
    }
};

const listar = async (req, res) => {
    try {
        const lista = await prisma.usuario.findMany();

        return res.status(200).json(lista);
    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            msg: "Erro ao listar usuários."
        });
    }
};

const buscar = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.usuario.findUnique({
            where: { id: Number(id) }
        });

        if (!item) {
            return res.status(404).json({
                msg: "Usuário não encontrado."
            });
        }

        return res.status(200).json(item);
    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            msg: "Erro ao buscar usuário."
        });
    }
};

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const dados = { ...req.body };

        // Não atualizar a senha por acidente com dados incompletos.
        const item = await prisma.usuario.update({
            where: { id: Number(id) },
            data: dados
        });

        return res.status(200).json(item);
    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            msg: "Erro ao atualizar usuário."
        });
    }
};

const excluir = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.usuario.delete({
            where: { id: Number(id) }
        });

        return res.status(200).json(item);
    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            msg: "Erro ao excluir usuário."
        });
    }
};

// Login do usuário
const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                msg: "Informe o e-mail e a senha."
            });
        }

        const usuario = await prisma.usuario.findFirst({
            where: { email: email }
        });

        if (!usuario || usuario.senha !== senha) {
            return res.status(401).json({
                msg: "E-mail ou senha inválidos."
            });
        }

        const { senha: senhaUsuario, ...dadosUsuario } = usuario;

        return res.status(200).json({
            msg: "Login realizado com sucesso!",
            usuario: dadosUsuario
        });
    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            msg: "Erro ao realizar login."
        });
    }
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir,
    login
};