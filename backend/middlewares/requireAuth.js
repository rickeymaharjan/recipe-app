const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" })
  }

  const token = authorization.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    const id = decoded.id

    User.findById(id).then((user) => {
      req.user_id = user._id
      next()
    })
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" })
  }
}

module.exports = requireAuth
