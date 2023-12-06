const express = require("express");
const router = express.Router();

const { sucess, fail } = require("../helpers/resposta");
const SeasonDAO = require("../model/seasonModel");
const Auth = require('../helpers/auth')

router.get("/", async (req, res) => {
  let seasons = await SeasonDAO.list();
  res.json(sucess(seasons, "list"));
});

router.get("/:id", Auth.validaAcesso, async (req, res) => {
  let obj = await SeasonDAO.getById(req.params.id);
  if (obj) res.json(sucess(obj));
  else res.status(500).json(fail("Não foi possível localizar a temporada"));
});

router.post("/", async (req, res) => {
  if (req.isAdmin) {
    const { year, driverChampion, constructorChampion, races } = req.body;
    let obj = await SeasonDAO.save(year, constructorChampion, driverChampion, races);
    if (obj) res.json(sucess(obj));
    else res.status(500).json(fail("Falha ao salvar a nova temporada"));
  } else {
    res.status(403).json(fail("Acesso Negado"));
  }
});

router.put("/:id", Auth.validaAcesso, async (req, res) => {
  if (req.isAdmin) {
    const { id } = req.params;
    const { year } = req.body;
    const { constructorChampion } = req.body;
    const { driverChampion } = req.body;
    const { races } = req.body;
    //validar campos

    let [result] = await SeasonDAO.update(
      id,
      year,
      constructorChampion,
      driverChampion,
      races
    );
    console.log(result);
    if (result) res.json(sucess(result));
    else res.status(500).json(fail("Falha ao alterar a temporada"));
  } else {
    res.status(403).json(fail("Acesso Negado"));
  }
});

router.delete("/:id", Auth.validaAcesso, async (req, res) => {
  if (req.isAdmin) {
    let result = await SeasonDAO.delete(req.params.id);
    if (result) res.json(sucess(result));
    else res.status(500).json(fail("Temporada não encontrado"));
  } else {
    res.status(403).json(fail("Acesso Negado"));
  }
});

module.exports = router;
