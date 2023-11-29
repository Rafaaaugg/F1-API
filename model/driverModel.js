const {DataTypes} = require("sequelize")
const sequelize = require("../helpers/bd")

const DriverModel = sequelize.define('Driver', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
        wins: DataTypes.INTEGER,
        polePosition: DataTypes.INTEGER,
        podium: DataTypes.INTEGER,
        championship: DataTypes.INTEGER
    }
)


module.exports = {
    list: async function() {
        const drivers = await DriverModel.findAll()
        return drivers
    },
    
    save: async function(name) {
        const driver = await DriverModel.create({
            name: name,
        })
        
        return season
    },

    update: async function(id, year, driverChamp, teamChamp) {
        return await SeasonModel.update({year: year},{driverChamp: driverChamp},{teamChamp: teamChamp}, {
            where: { id: id }
        })
    },

    delete: async function(id) {

        return await DriverModel.destroy({where: { id: id }})
    },

    getById: async function(id) {
        return await DriverModel.findByPk(id)
    },

    Model: DriverModel
}