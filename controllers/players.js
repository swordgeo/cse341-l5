const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//using try/catch for troubleshooting
const getPlayers = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db("cse341-database").collection('players').find();
    result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
    });
  } catch (err) {
    //500 means server error, not user error
    res.status(500).json({message: err.message});
  }

};

//await mongodb...  .find({_id: playerId})
const getPlayer = async (req, res, next) => {
  try {
    const playerId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db("cse341-database").collection('players').find({_id: playerId});
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    //500 means server error, not user error
    res.status(500).json({message: err.message});
  }
};

//await mongodb...  .insertOne(Player)
const addPlayer = async (req, res, next) => {
  //I notice it'll let me have some of these values blank but we'll deal with that in time
  const player = {
    playerName: req.body.playerName,
    characters: [
      {
        characterName: req.body.characterName,
        campaign: req.body.campaign,
        characterId: req.body.characterId
      }
    ]
  };
//might need mongodb.getDB()...
  try {
    const result = await mongodb.getDb().db("cse341-database").collection('players').insertOne(player);
    //201 means new thing created as opposed to general 200 "everything worked"
    res.status(201).json(result);
  } catch (err) {
    //400 means user error - didn't use all values for instance
    res.status(400).json({message: err.message});
  }
}

//await mongodb...  .find({_id: playerId})
const delPlayer = async (req, res, next) => {
  try {
    
    const playerId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db("cse341-database").collection('players').deleteOne({_id: playerId});

    //result = { "acknowledged" : true, "deletedCount" : 1 }
    if (result.deletedCount > 0) {
      res.status(200).json({message: "Successfully deleted player."});
    } else {
        //404 means does not exist
        res.status(404).json({message: "Can't find this player."});
    }
  } catch (err) {
    //500 means server error, not user error
    res.status(500).json({message: err.message});
  }
};


//await mongodb...  .replaceOne({_id: playerId}, <new info as const>)
const editPlayer = async (req, res, next) => {
    //this will over
    const player = {
      playerName: req.body.playerName,
      characters: [
        {
          characterName: req.body.characterName,
          campaign: req.body.campaign,
          characterId: req.body.characterId
        }
      ]
    };
    //console.log(Player);

  try {
    
    const playerId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db("cse341-database").collection('players').updateOne(
      {_id: playerId},
      //this will overwrite EVERYTHING; we can't change one field at a time (yet)
      {$set: {
        "playerName": player.playerName,
        "characters": player.characters
        
        // [
        //   {
        //     "characterName": player.characters.characterName,
        //     "campaign": player.characters.campaign,
        //     "characterId": player.characters.characterId
        //   }
        // ]
      }}
    );
    //console.log(result);

    //{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
    //Could add another nest for modifiedCount but to what end?
    if (result.matchedCount > 0) {
      //204 succeeds but doesn't navigate away
      //The relevant circumstance is I can't run json messages from it
      //But I'll leave it anyway or else it won't give me any response at all?!
      res.status(204).json({message: "Successfully updated player."});
    } else {
        //404 means does not exist
        res.status(404).json({message: "Can't find this player."});
    }
  } catch (err) {
    //500 means server error, not user error
    res.status(500).json({message: err.message});
  }
};


module.exports = { getPlayers, getPlayer, addPlayer, delPlayer, editPlayer};