const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema ({
  playerName: {
    type: String,
    required: true,
  },
  characterName: {
    type: String,
    required: true,
  },
  campaign: {
    type: String,
    required: true,
  }
});
  
module.exports = mongoose.model('Player', playerSchema);
