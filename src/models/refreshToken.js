const Sequelize = require("sequelize")

const refreshTokenSchema = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  refreshToken: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fingerprint: {
    type: Sequelize.TEXT,
    allowNull: true
  },
}

module.exports = refreshTokenSchema;
