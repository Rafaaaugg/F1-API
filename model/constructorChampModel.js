const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/bd");

const ConstructorModel = sequelize.define("Constructor", {
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
  driverCampionship: DataTypes.INTEGER,
  constructorChampionship: DataTypes.INTEGER,
});

module.exports = {
  list: async function () {
    const constructors = await ConstructorModel.findAll();
    return constructors;
  },

  save: async function (
    name,
    contry,
    wins,
    polePosition,
    podium,
    driverCampionship,
    constructorChampionship
  ) {
    const constructor = await ConstructorModel.create({
      name: name,
      contry: contry,
      wins: wins,
      polePosition: polePosition,
      podium: podium,
      driverCampionship: driverCampionship,
      constructorChampionship: constructorChampionship,
    });
    return constructor;
  },

  update: async function (
    id,
    name,
    contry,
    wins,
    polePosition,
    podium,
    driverCampionship,
    constructorChampionship
  ) {
    return await SeasonModel.update(
      { name: name },
      { contry: contry },
      { wins: wins },
      { polePosition: polePosition },
      { podium: podium },
      { driverCampionship: driverCampionship },
      { constructorChampionship: constructorChampionship },
      {
        where: { id: id },
      }
    );
  },

  delete: async function (id) {
    return await ConstructorModel.destroy({ where: { id: id } });
  },

  getById: async function (id) {
    return await ConstructorModel.findByPk(id);
  },

  getByName: async function (name) {
    const constructors = await ConstructorModel.findOne({
      where: { name: name },
    });
    return constructors;
  },

  Model: ConstructorModel,
};
