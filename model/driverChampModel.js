const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd")

const DriverModel = sequelize.define("Driver", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  contry: DataTypes.STRING,
  wins: DataTypes.INTEGER,
  polePosition: DataTypes.INTEGER,
  podium: DataTypes.INTEGER,
  championship: DataTypes.INTEGER,
})

module.exports = {
  list: async function (limite, pagina) {
    const limitOptions = [5, 10, 30]
    if (!limitOptions.includes(limite)) {
      throw new Error('O limite deve ser 5, 10 ou 30')
    }
    const offset = (pagina - 1) * limite
    const drivers = await DriverModel.findAll({
      limit: limite,
      offset: offset
    })
    return drivers
  },

  save: async function (
    name,
    contry,
    wins,
    polePosition,
    podium,
    championship
  ) {
    const driver = await DriverModel.create({
      name: name,
      contry: contry,
      wins: wins,
      polePosition: polePosition,
      podium: podium,
      championship: championship,
    })
    return driver
  },

  update: async function (
    id,
    name,
    contry,
    wins,
    polePosition,
    podium,
    championship
  ) {
    return await DriverModel.update(
      { name: name },
      { contry: contry },
      { wins: wins },
      { polePosition: polePosition },
      { podium: podium },
      { championship: championship },
      {
        where: { id: id },
      }
    )
  },

  delete: async function (id) {
    return await DriverModel.destroy({ where: { id: id } })
  },

  getById: async function (id) {
    return await DriverModel.findByPk(id)
  },

  getByName: async function (name) {
    const drivers = await DriverModel.findOne({
      where: { name: name },
    })
    return drivers
  },
  Model: DriverModel,
}