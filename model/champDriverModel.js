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
    
    save: async function(name, wins, polePosition, podium, championship) {
        const driver = await DriverModel.create({
            name: name,
            wins: wins,
            polePosition: polePosition,
            podium: podium,
            championship: championship
        })
        return driver
    },

    update: async function(id, name, wins, polePosition, podium, championship) {
        return await SeasonModel.update({name: name},{wins: wins},{polePosition: polePosition},{podium: podium},{championship: championship}, {
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