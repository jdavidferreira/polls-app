const mongoose = require('mongoose')
const Poll = mongoose.model('Poll')

exports.new = async (req, res) => {
  res.render('new-poll', { title: 'New Poll - Polls' })
}

exports.list = async (req, res) => {

  try {
    let polls = await Poll.find().populate('author')

    res.render('index', { title: "Polls", polls: polls })
  } catch (error) {
    res.status(500).send(error)
  }
}

exports.create = async (req, res) => {
  const poll = {
    name: req.body.name,
    description: req.body.description,
    author: res.locals.user._id,
    options: [
      { description: req.body.opt1, votes: 0 },
      { description: req.body.opt2, votes: 0 }
    ]
  }

  try {
    await Poll.create(poll)

    res.redirect('/')
  } catch (error) {
    res.status(500).send(error)
  }
}

exports.findById = async (req, res) => {
  let id = req.params.id

  try {
    let poll = await Poll.findOne({ _id: id })

    res.render('vote-poll', { title: 'Vote - Polls', poll: poll })
  } catch (error) {
    res.status(500).send(error)
  }
}

exports.results = async (req, res) => {
  let id = req.params.id

  let poll = await Poll.findOne({ _id: id }).populate('author')
  
  res.render('poll', { title: 'Vote - Polls', poll: poll })
}

exports.vote = async (req, res) => {
  let id = req.params.id
  let index = req.body.opt //option index voted

  try {

    let poll = await Poll.findOne({ _id: id })
  
    poll.options[index].votes++
  
    await poll.save()
  
    res.redirect('/')
  } catch (err) {
    console.error(err)
  }
}

exports.deleteById = async (req, res) => {
  let id = req.params.id

  try {
    let result = await Poll.deleteOne({ _id: id })

    res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}
