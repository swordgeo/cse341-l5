const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.character = require('./character.js')(mongoose);
db.players = require('./player.js')(mongoose);

module.exports = db;