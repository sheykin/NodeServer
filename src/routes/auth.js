const { v4: uuidv4 } = require('uuid')
const express = require('express')
const router = express.Router()
const { User, RefreshToken } = require('../modules/db/sequelize')
const { makePasswordHash, checkPassword, makeAccessToken, addRefreshToken } = require('../../src/utils')
const log = require('./../modules/logger')

router.post('/register', async function (req, res) {

  const userData = {
     email: req.body.email,
     password: req.body.password,
     name: req.body.name
  }

  try{
    const findUser = await User.findOne({where: {email: userData.email}})

    if( !findUser ){
      userData.passwordHash = await makePasswordHash(userData.password)
      const createdUserData = await User.create(userData)

      res.statusCode = 201
      return res.json({
        createdUserData
      });
    } else {
      res.statusCode = 409
      return res.json({
        error: 'user already exist'
      });
    }
  } catch (error) {
    throw error
  }

});

router.post('/login', async function (req, res) {

  const userData = {
    email: req.body.email,
    password: req.body.password
  }

  try {
    const findUser = await User.findOne({where: {email: userData.email}})

    if( !findUser ) {
      res.statusCode = 404
      return res.json({
        error: 'user not found'
      });
    } else {
      const isPasswordCorrect = await checkPassword(userData.password, findUser.passwordHash)

      if(isPasswordCorrect) {
        const accessToken = makeAccessToken(findUser)
        const refreshToken = uuidv4()

        const refreshData = {
          user: findUser,
          refreshToken: refreshToken
        }

        await addRefreshToken(refreshData)

        res.cookie('refreshToken',
          refreshToken,
          {
            signed: true,
            domain: 'localhost',
            path: '/auth',
            httpOnly: true,
          });

        return res.json({
          accessToken: accessToken,
          refreshToken: refreshData.refreshToken
        })
      } else {
        res.statusCode = 401
        return res.json({
          error: 'incorrect password'
        });
      }
    }
  } catch ( error ) {
    throw error
  }
});

router.post('/logout', async function (req, res) {
  const reqRefreshToken = req.signedCookies.refreshToken

  if (!reqRefreshToken) {
    res.statusCode = 400
    return res.json({
      error: 'refresh token not provided'
    });
  }

  try{
    await RefreshToken.destroy({where: {refreshToken: reqRefreshToken}})
    res.statusCode = 403
    return res.json({
      info: 'user logged out'
    })
  }catch (error) {
    throw error
  }
});

router.post('/refresh-token', async function (req, res) {
  const reqRefreshToken = req.signedCookies.refreshToken

  if (!reqRefreshToken) {
    res.statusCode = 400
    return res.json({
      error: 'refresh token not provided'
    })
  }

  try{
    const oldRefreshToken = await RefreshToken.findOne({where: {refreshToken: reqRefreshToken}})

    if(!oldRefreshToken) {
      res.statusCode = 403
      return res.json({
        error: 'non-logged user'
      })
    }

    await RefreshToken.destroy({where: {refreshToken: oldRefreshToken.refreshToken}})
    const findUser = await User.findOne({where: {id: oldRefreshToken.userId}})

    const newAccessToken = makeAccessToken(findUser)
    const newRefreshToken = uuidv4()

    const refreshData = {
      user: findUser,
      refreshToken: newRefreshToken
    }

    await addRefreshToken(refreshData)

    res.cookie('refreshToken',
      newRefreshToken,
      {
        signed: true,
        domain: 'localhost',
        path: '/auth',
        httpOnly: true,
      });

    return res.json({
      accessToken: newAccessToken,
      refreshToken: refreshData.refreshToken
    })

  }catch (error) {
    throw error
  }
})

module.exports = router
