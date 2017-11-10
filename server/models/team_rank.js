const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define model
const teamRank = new Schema({
  team: {type: String },
  score:  {type: Number }
});


const ModelClass = mongoose.model('teamRank', teamRank);

// Export model
module.exports = ModelClass;
