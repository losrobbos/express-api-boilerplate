import express from "express"
import jwt from 'jsonwebtoken'
import config from '../config.js'

const authRouter = express.Router()

const dbUsers = [
  { _id: "u1", email: "rob@rob.com", password: "rob123" },
  { _id: "u2", email: "henri@henri.com", password: "henri123" }
]

// Receive email password and if user found => create token!
authRouter.post("/login", (req, res, next) => {

  const { email, password } = req.body

  if(!email || !password) {
    return res.status(400).json({
      error: "Bidde email und password, buddy"
    })
  }

  // check if user with given email / pw exists in "database"
  const userFound = dbUsers.find( user => user.email === email && user.password === password ) 

  if(!userFound) {
    return res.status(400).json({
      error: "Bidde email und password, buddy"
    })
  }

  // hide password from any output... 
  delete userFound.password

  // generate token (store data encoded + generate signature and append signature to encoded data)
  // signature = encoded data encrypted with secret
  // token = string of encoded data + signature
  const SECRET = config.JWT_SECRET
  const payload = { _id: userFound._id, email: userFound.email }
  const token = jwt.sign(payload, SECRET, {
    expiresIn: '15m'
  })
  
  // return response with found user + token (=identity card of user)
  res.set("Authorization", token)
  res.json(userFound)

})

export default authRouter
