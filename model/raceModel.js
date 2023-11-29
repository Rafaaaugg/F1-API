const {DataTypes, Op} = require("sequelize")
const sequelize = require("../helpers/bd")
const seasonModel = require("./seasonModel")

const RaceModel = sequelize.define('Race', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING
    }
)


module.exports = {
    list: async function() {
        const races = await RaceModel.findAll()
        return races
    },
    
    save: async function(name) {
        const race = await RaceModel.create({
            name: name
        })
        return race
    },

    update: async function(id, name) {
        return await RaceModel.update({name: name}, {
            where: { codigo: id }
        })
    },

    delete: async function(id) {
        return await RaceModel.destroy({where: { codigo: id }})
    },

    getById: async function(id) {
        return await RaceModel.findByPk(id)
    },

    getByName: async function(name) {
        return await RaceModel.findOne({where: {name: {
            [Op.like]: '%' + name + '%'
        } }})
    },

    Model: RaceModel
}