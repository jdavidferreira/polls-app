const mongoose = require('mongoose')

const pollSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  options: [
    {
      description: String,
      votes: Number
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
}, { collection: 'poll', versionKey: false })

pollSchema.virtual('totalVotes').get(function () {
  return this.options.map(o => o.votes).reduce((a, b) => a + b)
})

pollSchema.methods.optionPercentage = function (index) {
  let totalVotes = this.totalVotes

  if (totalVotes > 0)
    return this.options[index].votes / totalVotes * 100
  else
    return 0
}

module.exports = mongoose.model('Poll', pollSchema)