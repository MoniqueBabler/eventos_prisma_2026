
const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    try {
        const {
            usuarioId,
            cidade,
            tipoEvento,
            temperaturaMaxima,
            data,
            nivelImpacto
        } = req.body;

        const item = await prisma.evento.create({
            data: {
                usuarioId: Number(usuarioId),
                cidade,
                tipoEvento,
                temperaturaMaxima:
                    temperaturaMaxima === "" ||
                    temperaturaMaxima === null ||
                    temperaturaMaxima === undefined
                        ? null
                        : Number(temperaturaMaxima),
                data: data ? new Date(data) : new Date(),
                nivelImpacto
            }
        });

        return res.status(201).json(item);
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            msg: "Erro ao cadastrar evento."
        });
    }
};

const listar = async (req, res) => {
    try {
        const lista = await prisma.evento.findMany({
            include: { usuario: { select: { nome: true } } }
        });

        return res.status(200).json(lista);
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            msg: "Erro ao listar eventos."
        });
    }
};

const buscar = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.evento.findUnique({
            where: { id: Number(id) }
        });

        if (!item) {
            return res.status(404).json({ msg: "Evento não encontrado." });
        }

        return res.status(200).json(item);
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ msg: "Erro ao buscar evento." });
    }
};

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const dados = { ...req.body };

        delete dados.id;
        delete dados.usuarioId;
        delete dados.usuario;

        if (dados.temperaturaMaxima === "") {
            dados.temperaturaMaxima = null;
        } else if (dados.temperaturaMaxima !== undefined &&
                   dados.temperaturaMaxima !== null) {
            dados.temperaturaMaxima = Number(dados.temperaturaMaxima);
        }

        if (dados.data) {
            dados.data = new Date(dados.data);
        }

        const item = await prisma.evento.update({
            where: { id: Number(id) },
            data: dados
        });

        return res.status(200).json(item);
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            msg: "Erro ao atualizar evento."
        });
    }
};

const excluir = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.evento.delete({
            where: { id: Number(id) }
        });

        return res.status(200).json(item);
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            msg: "Erro ao excluir evento."
        });
    }
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};