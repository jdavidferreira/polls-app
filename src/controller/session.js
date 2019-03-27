const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.new = async (req, res) => {
  res.render('login', { title: "Log In - Polls" })
}

exports.login = async (req, res) => {
  let email = req.body.email
  let password = req.body.password

  let user = await User.authenticate(email, password)

  if (user) {
    req.session.userId = user._id

    res.redirect("/")
  } else {
    console.log("auth failed")
    //render login again with message authentication failed
  }
}

exports.logout = async (req, res) => {
  delete req.session.userId

  res.redirect("/")
}