const {DataTypes, Op} = require("sequelize")
const sequelize = require("../helpers/bd")
const RaceModel = require('./raceModel')
const Season = require('./seasonModel')

const DriverModel = sequelize.define('Driver', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
        champ: DataTypes.INTEGER
    }
)

DriverModel.hasMany(RaceModel, { foreignKey: 'wins' });
DriverModel.hasMany(RaceModel, { foreignKey: 'wins' });

module.exports = {
    list: async function() {
        const drivers = await DriverModel.findAll()
        return drivers
    },
    
    save: async function(year, driverChamp, teamChamp) {
        const driver = await DriverModel.create({
            name: year,
            driverChamp: driverChamp,
            teamChamp: teamChamp
        })
        
        return season
    },

    update: async function(id, year, driverChamp, teamChamp) {
        return await SeasonModel.update({year: year},{driverChamp: driverChamp},{teamChamp: teamChamp}, {
            where: { id: id }
        })
    },

    delete: async function(id) {

        return await SeasonModel.destroy({where: { id: id }})
    },

    getById: async function(id) {
        return await SeasonModel.findByPk(id)
    },

    getByYear: async function(year) {
        return await SeasonModel.findOne({where: {year:year} })
    },

    Model: SeasonModel
}