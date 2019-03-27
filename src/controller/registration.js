const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.new = async (_req, res) => {
  res.render('register', { title: "Sign Up - Polls" })
}

exports.register = async (req, res) => {

  let user = {
    email: req.body.email,
    password: req.body.password
  }

  try {
    await User.create(user)
    
    res.redirect('/session/new')
  } catch (err) {
    if(err.name == 'ValidationError') {
      //res.render()
    }
    res.status(500).send(err)
  }
}