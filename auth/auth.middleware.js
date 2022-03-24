import jwt from 'jsonwebtoken'


// TOKEN expected
export const auth = (req, res, next) => {

  const token = req.headers.authorization

  if(!token) {
    return res.status(401).json({
      error: "No rights to get further here, fuck off"
    })
  }

  const SECRET = "daHolySecretPrettyLenghtyWithLoadsOfSpecialCharsIdeally"

  // { _id, email }
  const tokenData = jwt.verify(token, SECRET)
  // store user data in request
  req.user = tokenData

  next()
}