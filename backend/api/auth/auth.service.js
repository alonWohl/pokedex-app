import Cryptr from 'cryptr'
import bcrypt from 'bcrypt'

import { logger } from '../../services/logger.service.js'
import { userService } from '../../api/user/user.service.js'

const cryptr = new Cryptr(process.env.SECRET || 'Secret-Puk-1234')

export const authService = {
  signup,
  login,
  getLoginToken,
  validateToken
}

async function login(username, password) {
  logger.debug(`auth.service - login with username: ${username}`)

  const user = await userService.getByUsername(username)
  if (!user) return Promise.reject('Invalid username or password')

  // TODO: un-comment for real login
  // const match = await bcrypt.compare(password, user.password)
  // if (!match) return Promise.reject('Invalid username or password')

  delete user.password
  user._id = user._id.toString()
  return user
}

async function signup({ username, password, fullname, imgUrl, isAdmin }) {
  const saltRounds = 10

  logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`)
  if (!username || !password || !fullname) return Promise.reject('Missing required signup information')

  const userExist = await userService.getByUsername(username)
  if (userExist) return Promise.reject('Username already taken')

  const hash = await bcrypt.hash(password, saltRounds)
  return userService.add({ username, password: hash, fullname, imgUrl, isAdmin })
}

function getLoginToken(user) {
  const userInfo = {
    _id: user._id,
    fullname: user.fullname,
    score: user.score,
    isAdmin: user.isAdmin
  }
  return cryptr.encrypt(JSON.stringify(userInfo))
}

function validateToken(loginToken) {
  try {
    const json = cryptr.decrypt(loginToken)
    const loggedinUser = JSON.parse(json)
    return loggedinUser
  } catch (err) {
    console.log('Invalid login token')
  }
  return null
}

async function loginGoogle(credential) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()

    const user = await userService.getByUsername(payload.email)
    if (!user) return null // User needs to signup

    delete user.password
    user._id = user._id.toString()
    return user
  } catch (err) {
    logger.error('Failed to verify Google token', err)
    throw err
  }
}

async function signupGoogle(credential) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()

    const existingUser = await userService.getByUsername(payload.email)
    if (existingUser) {
      throw new Error('User already exists')
    }

    const user = await userService.add({
      username: payload.email,
      fullname: payload.name,
      password: cryptr.encrypt(payload.sub), // Encrypt Google's sub as password
      imgUrl: payload.picture,
      isAdmin: false,
      googleId: payload.sub
    })

    delete user.password
    user._id = user._id.toString()
    return user
  } catch (err) {
    logger.error('Failed to signup with Google', err)
    throw err
  }
}
