const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const characterSchema = new mongoose.Schema ({
  characterName: {
    type: String,
    required: true,
  },
  playerName: {
    type: String,
    required: true,
  },
  race: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  alignment: {
    type: String,
    required: true,
  },
  stats: {
    str: Number,
    dex: Number,
    con: Number,
    int: Number,
    wis: Number,
    cha: Number
  }
});
  


module.exports = mongoose.model('Character', characterSchema);