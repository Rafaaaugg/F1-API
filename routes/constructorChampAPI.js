const express = require("express");
const router = express.Router();

const { sucess, fail } = require("../helpers/resposta");
const costructorDAO = require("../model/constructorChampModel");

router.get("/", (req, res) => {
  costructorDAO.list().then((costructors) => {
    res.json(sucess(costructors, "list"));
  });
});

router.get("/:name", (req, res) => {
  costructorDAO
    .getByName(req.params.name)
    .then((costructor) => {
      res.json(sucess(costructor));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(fail("Não foi possível localizar o construtor"));
    });
});

router.post("/", (req, res) => {
  const {
    name,
    contry,
    wins,
    polePosition,
    podium,
    driverCampionship,
    constructorChampionship,
  } = req.body;

  //TODO validar os campos

  costructorDAO
    .save(
      name,
      contry,
      wins,
      polePosition,
      podium,
      driverCampionship,
      constructorChampionship
    )
    .then((costructor) => {
      res.json(sucess(costructor));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(fail("Falha ao salvar o novo construtor"));
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const {
    name,
    contry,
    wins,
    polePosition,
    podium,
    driverCampionship,
    constructorChampionship,
  } = req.body;

  //TODO validar os campos
  let obj = {};
  if (name) obj.name = name;
  if (contry) obj.contry = contry;
  if (wins) obj.wins = wins;
  if (polePosition) obj.polePosition = polePosition;
  if (podium) obj.podium = podium;
  if (driverCampionship) obj.driverCampionship = driverCampionship;
  if (constructorChampionship)
    obj.constructorChampionship = constructorChampionship;

  if (obj == {}) {
    return res.status(500).json(fail("Nenhum atributo foi modificado"));
  }

  costructorDAO
    .update(id, obj)
    .then((costructor) => {
      if (costructor) res.json(sucess(costructor));
      else res.status(500).json(fail("Construtor não encontrada"));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(fail("Falha ao alterar o construtor"));
    });
});

router.delete("/:id", (req, res) => {
  costructorDAO
    .delete(req.params.id)
    .then((costructor) => {
      if (costructor) res.json(sucess(costructor));
      else res.status(500).json(fail("Construtor não encontrada"));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(fail("Falha ao excluir o construtor"));
    });
});

module.exports = router;
