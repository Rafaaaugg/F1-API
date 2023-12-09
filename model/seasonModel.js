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

SeasonModel.belongsTo(constructor.Model, { foreignKey: "constructorChampion" });
SeasonModel.belongsTo(driver.Model, { foreignKey: "driverChampion" });
SeasonModel.hasMany(race.Model, { foreignKey: "races" });
SeasonModel.belongsTo(race.Model, { foreignKey: "races", })


module.exports = {

  list: async function (limite, pagina) {
    const limitOptions = [5, 10, 30];
    if (!limitOptions.includes(limite)) {
      throw new Error('O limite deve ser 5, 10 ou 30');
    }
    const offset = (pagina - 1) * limite;
    const seasons = await SeasonModel.findAll({
      limit: limite,
      offset: offset
    },
      { include: constructor.Model },
      { include: driver.Model },
      { include: race.Model });
    return seasons;
  },

  save: async function (year, constructorChampionId, driverChampionId, races) {
    const season = await SeasonModel.create({
      year: year,
      constructorChampion: constructorChampionId,
      driverChampion: driverChampionId,
      races: races,
    });

    return season;
  },

  update: async function (id, year, constructorChampionId, driverChampionId, races) {
    return await SeasonModel.update(
      {
        year: year,
        constructorChampion: constructorChampionId,
        driverChampion: driverChampionId,
        races: races
      },
      {
        where: { id: id }
      }
    );
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

  Model: SeasonModel,
}