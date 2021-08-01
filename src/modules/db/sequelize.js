const Sequelize = require("sequelize")
const user = require('../../models/user')
const refreshToken = require('../../models/refreshToken')
const { CONNECTIONS } = require('../../config')

const sequelize = new Sequelize(CONNECTIONS.DB, CONNECTIONS.USER, CONNECTIONS.PASSWORD, {
  dialect: "mysql",
  host: "localhost"
});

const User = sequelize.define("user", user )
const RefreshToken = sequelize.define("refreshToken", refreshToken )

User.hasMany(RefreshToken, { onDelete: "cascade" })

sequelize.sync().then( result => {}).catch(err=> console.log(err))

module.exports = {
  User,
  RefreshToken
}
