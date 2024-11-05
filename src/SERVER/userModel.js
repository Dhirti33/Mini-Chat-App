const mongoose = require('mongoose')

// // Schema and Model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel