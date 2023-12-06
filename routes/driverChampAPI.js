const express = require("express");
const router = express.Router();

const { sucess, fail } = require("../helpers/resposta");
const driverDAO = require("../model/driverChampModel");
const Auth = require('../helpers/auth')

router.get("/", (req, res) => {
  driverDAO.list().then((drivers) => {
    res.json(sucess(drivers, "list"));
  });
});

router.get("/:name", (req, res) => {
  driverDAO
    .getByName(req.params.name)
    .then((drivers) => {
      res.json(sucess(drivers));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(fail("Não foi possível localizar o piloto"));
    });
});

router.post("/", Auth.validaAcesso, (req, res) => {
  if (req.isAdmin) {
    const { name, contry, wins, polePosition, podium, championship } = req.body;

    //TODO validar os campos

    driverDAO
      .save(name, contry, wins, polePosition, podium, championship)
      .then((driver) => {
        res.json(sucess(driver));
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(fail("Falha ao salvar o novo piloto"));
      });
  } else {
    res.status(403).json(fail("Acesso Negado"));
  }
});

router.put("/:id", Auth.validaAcesso, (req, res) => {
  if (req.isAdmin) {
    const { id } = req.params;
    const { name, contry, wins, polePosition, podium, championship } = req.body;

    //TODO validar os campos
    let obj = {};
    if (name) obj.name = name;
    if (contry) obj.contry = contry;
    if (wins) obj.wins = wins;
    if (polePosition) obj.polePosition = polePosition;
    if (podium) obj.podium = podium;
    if (championship) obj.championship = championship;

    if (obj == {}) {
      return res.status(500).json(fail("Nenhum atributo foi modificado"));
    }

    driverDAO
      .update(id, obj)
      .then((race) => {
        if (race) res.json(sucess(race));
        else res.status(500).json(fail("Piloto não encontrada"));
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(fail("Falha ao alterar o Piloto"));
      });
  } else {
    res.status(403).json(fail("Acesso Negado"));
  }
});

router.delete("/:id", Auth.validaAcesso, (req, res) => {
  if (req.isAdmin) {
    driverDAO
      .delete(req.params.id)
      .then((driver) => {
        if (driver) res.json(sucess(driver));
        else res.status(500).json(fail("Piloto não encontrado"));
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(fail("Falha ao excluir o piloto"));
      });
  } else {
    res.status(403).json(fail("Acesso Negado"));
  }
});

module.exports = router;
