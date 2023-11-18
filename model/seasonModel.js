const {DataTypes, Op} = require("sequelize")
const sequelize = require("../helpers/bd")


const SeasonModel = sequelize.define('Season', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        year: DataTypes.INTEGER,
        driverChamp: DataTypes.STRING,
        teamChamp: DataTypes.STRING
    }
)

SeasonModel.hasMany(RaceModel, { foreignKey: 'season' });

module.exports = {
    list: async function() {
        const seasons = await SeasonModel.findAll()
        return seasons
    },
    
    save: async function(year, driverChamp, teamChamp) {
        const season = await SeasonModel.create({
            year: year,
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