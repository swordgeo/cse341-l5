const Player = require('../models/player')

//using try/catch for troubleshooting
const getPlayers = async (req, res, next) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

//using try/catch for troubleshooting
const getPlayer = async (req, res, next) => { 
  try {
    const player = await Player.findById(req.params.id);
    res.json(player);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

//await mongodb...  .insertOne(player)
const addPlayer = async (req, res, next) => {
  //I notice it'll let me have some of these values blank but we'll deal with that in time
  const player = new Player({
    playerName: req.body.playerName,
    characterName: req.body.characterName,
    campaign: req.body.campaign
  });
  try {
    const newPlayer = await player.save();
    //201 means new thing created as opposed to general 200 "everything worked"
    res.status(201).json(newPlayer);
  } catch (err) {
    //400 means user error - didn't use all values for instance
    res.status(400).json({message: err.message});
  }
}

//using try/catch for troubleshooting
const delPlayer = async (req, res, next) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      // 404 means does not exist
      res.status(404).json({message: "Can't find this player."});
      return;
    }
    const result = player.remove();
    res.status(200).json({message: "Successfully deleted player."});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const editPlayer = async (req, res, next) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!player) return res.status(404).send("No player found.")
    res.status(200).send(player)
  } catch(err) {
    res.status(500).send(err)
  }
}

module.exports = { getPlayers, getPlayer, addPlayer, delPlayer, editPlayer};
