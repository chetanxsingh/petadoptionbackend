const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  id: Number,
  name: String,
  age: Number,
  price: Number,
  status: String,
  favorite: Boolean,
  image: String
});

module.exports = mongoose.model('Pet', petSchema);