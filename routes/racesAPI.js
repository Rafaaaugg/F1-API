const express = require("express")
const router = express.Router()

const { sucess, fail } = require("../helpers/resposta")
const Auth = require('../helpers/auth')
const RaceDAO = require("../model/raceModel")

router.get("/", (req, res) => {
  const { limite = 5, pagina = 1 } = req.body

  RaceDAO.list(parseInt(limite), parseInt(pagina))
    .then((races) => {
      res.json(sucess(races, "list"))
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
})

router.get("/:name", Auth.validaAcesso, (req, res) => {
  RaceDAO.getByName(req.params.name)
    .then((race) => {
      res.json(sucess(race))
    })
    .catch((err) => {
      consol.elog(err)
      res.status(500).json(fail("Não foi possível localizar a corrida"))
    })
})

router.post("/", Auth.validaAcesso, (req, res) => {
  if (req.isAdmin) {
    const { name} = req.body
    RaceDAO.save(name)
      .then((race) => {
        res.json(sucess(race))
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(fail("Falha ao salvar a nova corrida"))
      })
  } else {
    res.status(403).json(fail("Acesso Negado"))
  }
})

router.put("/:id", Auth.validaAcesso, (req, res) => {
  if (req.isAdmin) {
    const { id } = req.params
    const { name} = req.body

    let obj = {}
    if (name) obj.name = name

    if (obj == {}) {
      return res.status(500).json(fail("Nenhum atributo foi modificado"))
    }

    RaceDAO.update(id, obj)
      .then((race) => {
        if (race) res.json(sucess(race))
        else res.status(500).json(fail("Corrida não encontrada"))
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(fail("Falha ao alterar a corrida"))
      })
  } else {
    res.status(403).json(fail("Acesso Negado"))
  }
})

router.delete("/:id", Auth.validaAcesso, (req, res) => {
  if (req.isAdmin) {
    RaceDAO.delete(req.params.id)
      .then((race) => {
        if (race) res.json(sucess(race))
        else res.status(500).json(fail("Corrida não encontrada"))
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(fail("Falha ao excluir a corrida"))
      })
  } else {
    res.status(403).json(fail("Acesso Negado"))
  }
})

module.exports = router