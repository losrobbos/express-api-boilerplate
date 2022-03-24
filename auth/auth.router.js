import express from "express"
import jwt from 'jsonwebtoken'

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

  // return found user
  delete userFound.password

  const SECRET = "daHolySecretPrettyLenghtyWithLoadsOfSpecialCharsIdeally"
  const payload = { _id: userFound._id, email: userFound.email }
  const token = jwt.sign(payload, SECRET, {
    expiresIn: '15m'
  })
  
  res.set("Authorization", token)
  res.json(userFound)

})

export default authRouter
