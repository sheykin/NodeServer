const { RefreshToken } = require('../modules/db/sequelize')

const MAX_REFRESH_TOKEN_COUNT = 5

async function addRefreshToken (refreshData) {
  try {
    if(!await isValidRefreshTokenCount(refreshData.user.id)) {
      await deleteAllRefreshTokens(refreshData.user.id)
    }
    await refreshData.user.createRefreshToken({ refreshToken: refreshData.refreshToken })
  } catch (error) {
    throw error
  }
}

async function isValidRefreshTokenCount (userId) {
  const existingRefreshTokenCount = await RefreshToken.count({where: {userId: userId}})
  return existingRefreshTokenCount < MAX_REFRESH_TOKEN_COUNT
}

async function deleteAllRefreshTokens (userId) {
  return await RefreshToken.destroy({where: {userId: userId}})
}

module.exports = { addRefreshToken }
