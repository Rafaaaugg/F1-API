const express = require("express")
const router = express.Router()

const {sucess, fail} = require("../helpers/resposta")
const SeasonDAO = require('../model/seasonModel')

router.get("/", async (req, res) => {
    let seasons = await SeasonDAO.list()
    res.json(sucess(seasons, "list"))
})

router.get("/:id", async (req, res) => {
    let obj = await SeasonDAO.getById(req.params.id)
    if (obj)
        res.json(sucess(obj))
    else 
        res.status(500).json(fail("Não foi possível localizar a temporada"))
})

router.post("/", async (req, res) => {
  const {year, driverChamp, teamChamp} = req.body
  //validar campos
  let obj = await SeasonDAO.save(year, driverChamp, teamChamp)
  if (obj)
      res.json(sucess(obj))
  else 
      res.status(500).json(fail("Falha ao salvar a nova temporada"))
})

router.put("/:id", async (req, res) => {
  const {id} = req.params
  const {year} = req.body
  const {driverChamp} = req.body
  const {teamChamp} = req.body
  //validar campos

  let [result] = await SeasonDAO.update(id, year,driverChamp, teamChamp)
  console.log(result)
  if (result)
      res.json(sucess(result))
  else
      res.status(500).json(fail("Falha ao alterar a temporada"))
})

router.delete("/:id", async (req, res) => {
    let result = await SeasonDAO.delete(req.params.id)
    if (result)
        res.json(sucess(result))
    else
        res.status(500).json(fail("Temporada não encontrado"))
})

module.exports = router