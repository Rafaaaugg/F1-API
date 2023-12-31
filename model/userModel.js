const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd")

const UserModel = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    defaultValue: 'comum',
  },
})

module.exports = {
  createUser: async function (usuario, senha, tipo) {
    const user = await UserModel.create({
      usuario: usuario,
      senha: senha,
      tipo: tipo,
    })
    return user
  },

  createAdmin: async function (usuario, senha, tipo) {
    const admin = await UserModel.create({
      usuario: usuario,
      senha: senha,
      tipo: tipo,
    })
    return admin
  },

  updateUser: async function (id, usuario, senha) {
    return await UserModel.update(
      {
        usuario: usuario,
        senha: senha,
      },
      {
        where: { id: id },
      }
    )
  },

  deleteUser: async function (id) {
    await UserModel.destroy({ where: { id: id } })
    return 'Usuário excluído com sucesso'
  },

  getUserById: async function (id) {
    return await UserModel.findByPk(id)
  },

  getUserByUsername: async function (username) {
    const user = await UserModel.findOne({
      where: { usuario: username },
    })
    return user
  },

  Model: UserModel,
}