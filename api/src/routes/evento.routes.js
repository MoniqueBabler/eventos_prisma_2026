
const express = require("express");
const router = express.Router();

const eventoController = require("../controllers/evento.controller");

router.post("/", eventoController.cadastrar);
router.get("/", eventoController.listar);
router.get("/:id", eventoController.buscar);
router.put("/:id", eventoController.atualizar);
router.delete("/:id", eventoController.excluir);

module.exports = router;