const express = require("express")
const router = express.Router()

const {sucess, fail} = require("../helpers/resposta")
const RaceDAO = require("../model/raceModel")

router.get("/", (req, res) => {
    RaceDAO.list().then((races) => {
        res.json(sucess(races, "list"))
    })
})

router.get("/:name", (req, res) => {
    RaceDAO.getByName(req.params.name).then(race => {
        res.json(sucess(race))
    }).catch(err => {
        consol.elog(err)
        res.status(500).json(fail("Não foi possível localizar a corrida"))
    })
})

router.post("/", (req, res) => {
    const {name, season} = req.body

    //TODO validar os campos

    RaceDAO.save(name, season).then(race => {
        res.json(sucess(race))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao salvar a nova corrida"))
    })
})

router.put("/:id", (req, res) => {
    const {id} = req.params
    const {name, season} = req.body

    //TODO validar os campos
    let obj = {}
    if (name) obj.name = name
    if (season) obj.season = season

    if (obj == {}) {
        return res.status(500).json(fail("Nenhum atributo foi modificado"))
    }

    RaceDAO.update(id, obj).then(race => {
        if (race)
            res.json(sucess(race))
        else
            res.status(500).json(fail("Corrida não encontrada"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao alterar a corrida"))
    })
})

router.delete("/:id", (req, res) => {
    RaceDAO.delete(req.params.id).then(race => {
        if (race)
            res.json(sucess(race))
        else
            res.status(500).json(fail("Corrida não encontrada"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao excluir a corrida"))
    })
})

module.exports = router