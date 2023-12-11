const { DataTypes, Op } = require("sequelize")
const sequelize = require("../helpers/bd")
const constructor = require("./constructorChampModel")
const driver = require("./driverChampModel")
const race = require("./raceModel")

const SeasonModel = sequelize.define("Season", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  year: DataTypes.INTEGER,
})
SeasonModel.belongsTo(constructor.Model, { foreignKey: "constructorChampion" })
SeasonModel.belongsTo(driver.Model, { foreignKey: "driverChampion" })
SeasonModel.belongsToMany(race.Model, { through: "SeasonRace", foreignKey: "seasonId" })

module.exports = {

  list: async function (limite, pagina) {
    const limitOptions = [5, 10, 30]
    if (!limitOptions.includes(limite)) {
      throw new Error('O limite deve ser 5, 10 ou 30')
    }
    const offset = (pagina - 1) * limite

    const seasons = await SeasonModel.findAll({
      limit: limite,
      offset: offset,
      include: [
        {
          model: constructor.Model,
          as: 'Constructor',
        },
        {
          model: driver.Model,
          as: 'Driver'
        },
      ],
    })

    for (let i = 0 ;i < seasons.length ;i++) {
      seasons[i].dataValues.races = await this.getRacesBySeason(seasons[i].id)
    }

    return seasons
  },

  save: async function (year, constructorChampionId, driverChampionId, races) {
    const season = await SeasonModel.create({
      year: year,
      constructorChampion: constructorChampionId,
      driverChampion: driverChampionId,
    })

    await season.addRaces(races)
    return season
  },

  update: async function (id, year, constructorChampionId, driverChampionId, races) {
    const season = await SeasonModel.findByPk(id)
    if (!season) {
      throw new Error('Temporada não encontrada')
    }

    await season.setRaces(races)
    return await season.update({
      year: year,
      constructorChampion: constructorChampionId,
      driverChampion: driverChampionId,
    })
  },

  delete: async function (id) {
    return await SeasonModel.destroy({ where: { id: id } })
  },

  getById: async function (id) {
    return await SeasonModel.findByPk(id)
  },

  getByYear: async function (year) {
    return await SeasonModel.findOne({ where: { year: year } })
  },

  getRacesBySeason: async function (seasonId) {
    const season = await SeasonModel.findByPk(seasonId)
    if (!season) {
      throw new Error('Temporada não encontrada')
    }

    const races = await season.getRaces()
    return races
  },

  Model: SeasonModel,
}