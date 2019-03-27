const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.checkSession = async (req, res, next) => {

  const userId = req.session.userId

  if (userId) {

    const user = await User.findOne({ _id: userId })
 
    res.locals.user = user
    res.locals.authenticated = true
  } else {
    delete res.locals.user
    res.locals.authenticated = false
  }

  next()
}