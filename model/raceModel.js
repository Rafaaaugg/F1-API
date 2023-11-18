const {DataTypes} = require("sequelize")
const sequelize = require("../helpers/bd")
const Season = require('./Season')
const Driver = require('./Driver')

const RaceModel = sequelize.define("Race",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    name:{
      type: DataTypes.STRING,
    }
  }
);

RaceModel.belongsTo(Season, { foreignKey: 'season' }); // Relacionamento com Temporada
RaceModel.belongsTo(Driver, { foreignKey: 'winner' }); // Relacionamento com Piloto (vencedor)

Driver.hasMany(RaceModel, { foreignKey: 'winner' }); // Um Piloto pode vencer várias corridas
Season.hasMany(RaceModel, { foreignKey: 'season' }); // Uma Temporada pode ter várias corridas

module.exports = {
  list: async function() {
      const races = await RaceModel.findAll()
      return races
  },
  
  save: async function(name, season, winner) {
      const race = await RaceModel.create({
          name: name,
          season: season,
          winner: winner
      })
      return race
  },

  update: async function(id, name, season, winner) {
      return await RaceModel.update({name: name},{season: season},{winner: winner},{
          where: { id: id }
      })
  },

  delete: async function(id) {
      return await RaceModel.destroy({where: { id: id }})
  },

  getById: async function(id) {
      return await RaceModel.findByPk(id)
  },

  getByName: async function(name) {
      return await RaceModel.findMany({
          where: {
              name: {
                  [Op.like]: '%' + name + '%'
              } 
          }
      })
  },

  Model: RaceModel 
}