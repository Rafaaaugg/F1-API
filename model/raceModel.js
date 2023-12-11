const { DataTypes, Op } = require("sequelize")
const sequelize = require("../helpers/bd")
const seasonModel = require("./seasonModel")

const RaceModel = sequelize.define("Race", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
})

module.exports = {
  list: async function (limite, pagina) {
    const limitOptions = [5, 10, 30]
    if (!limitOptions.includes(limite)) {
      throw new Error('O limite deve ser 5, 10 ou 30')
    }
    const offset = (pagina - 1) * limite
    const races = await RaceModel.findAll({
      limit: limite,
      offset: offset
    })
    return races
  },

  save: async function (name) {
    const race = await RaceModel.create({
      name: name,
    })
    return race
  },

  update: async function (id, name) {
    return await RaceModel.update(
      { name: name },
      {
        where: { codigo: id },
      }
    )
  },

  delete: async function (id) {
    return await RaceModel.destroy({ where: { codigo: id } })
  },

  getById: async function (id) {
    return await RaceModel.findByPk(id)
  },

  getByName: async function (name) {
    const races = await RaceModel.findOne({
      where: { name: name },
    })
    return races
  },

  Model: RaceModel,
}