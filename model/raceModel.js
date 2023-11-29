const {DataTypes} = require("sequelize")
const sequelize = require("../helpers/bd")


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

module.exports = {
  list: async function() {
        const races = await RaceModel.findAll()
        return races
  },
  
  save: async function(name, season) {
      const race = await RaceModel.create({
          name: name,
          season: season,
      })
      return race
  },

  update: async function(id, obj) {
      return await RaceModel.update({name: obj.name},{season: obj.season},{
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