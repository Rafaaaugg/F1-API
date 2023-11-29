const {DataTypes, Op} = require("sequelize")
const sequelize = require("../helpers/bd")
const constructor = require('./champConstructorModel')
const driver = require('./champDriverModel')

const SeasonModel = sequelize.define('Season', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        year: DataTypes.INTEGER,
        races: DataTypes.ARRAY
    }
)

SeasonModel.belongsTo(constructor.Model, { foreignKey: 'constructorChampion' });
SeasonModel.belongsTo(driver.Model, { foreignKey: 'driverChampion' });

module.exports = {

    list: async function() {
        const seasons = await SeasonModel.findAll({ include: constructor.Model },{ include: driver.Model })
        return seasons
    },
    
    save: async function(year, driverChamp, teamChamp, races) {
        const season = await SeasonModel.create({
            year: year,
            driverChamp: driverChamp,
            teamChamp: teamChamp,
            races: races
        })
        return season
    },

    update: async function(id, year, driverChamp, teamChamp, races) {
        return await SeasonModel.update({year: year},{driverChamp: driverChamp},{teamChamp: teamChamp},{races: races},{
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