const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    minlength: 3
  },
  favoriteGenre: String
})

module.exports = mongoose.model('User', schema)