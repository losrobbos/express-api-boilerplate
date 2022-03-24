import jwt from 'jsonwebtoken'


// Our "security guard" we can put in front of any door (=route)
// 
// It expects a valid JWT TOKEN in the authorization header
export const auth = (req, res, next) => {

  const token = req.headers.authorization

  // deny no token
  if(!token) {
    return res.status(401).json({
      error: "No rights to get further here, fuck off"
    })
  }

  const SECRET = "daHolySecretPrettyLenghtyWithLoadsOfSpecialCharsIdeally"

  try {
    // Verify token and extract payload => { _id, email }
    const tokenData = jwt.verify(token, SECRET)

    // store user data in request for further processing 
    // (e.g. to load items of user with given ID from database)
    req.user = tokenData
    next()
  }
  catch(err) {
    next(err)
  }

}