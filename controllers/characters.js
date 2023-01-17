const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//using try/catch for troubleshooting
const getCharacters = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db("cse341-database").collection('characters').find();
    result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
    });
  } catch (err) {
    //500 means server error, not user error
    res.status(500).json({message: err.message});
  }

};

//await mongodb...  .find({_id: userId})
const getCharacter = async (req, res, next) => {
  try {
    const characterId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db("cse341-database").collection('characters').find({_id: characterId});
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    //500 means server error, not user error
    res.status(500).json({message: err.message});
  }
};

//await mongodb...  .insertOne(character)
const addCharacter = async (req, res, next) => {
  //I notice it'll let me have some of these values blank but we'll deal with that in time
  const character = {
    characterName: req.body.characterName,
    playerName: req.body.playerName,
    race: req.body.race,
    class: req.body.class,
    level: req.body.level,
    alignment: req.body.alignment,
    stats: {
      str: req.body.stats.str,
      dex: req.body.stats.dex,
      con: req.body.stats.con,
      int: req.body.stats.int,
      wis: req.body.stats.wis,
      cha: req.body.stats.cha
    }
  };
//might need mongodb.getDB()...
  try {
    const result = await mongodb.getDb().db("cse341-database").collection('characters').insertOne(character);
    //201 means new thing created as opposed to general 200 "everything worked"
    res.status(201).json(result);
  } catch (err) {
    //400 means user error - didn't use all values for instance
    res.status(400).json({message: err.message});
  }
}

//await mongodb...  .find({_id: userId})
const delCharacter = async (req, res, next) => {
  try {
    
    const characterId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db("cse341-database").collection('characters').deleteOne({_id: characterId});

    //result = { "acknowledged" : true, "deletedCount" : 1 }
    if (result.deletedCount > 0) {
      res.status(200).json({message: "Successfully deleted character."});
    } else {
        //404 means does not exist
        res.status(404).json({message: "Can't find this character."});
    }
  } catch (err) {
    //500 means server error, not user error
    res.status(500).json({message: err.message});
  }
};


//await mongodb...  .replaceOne({_id: userId}, <new info as const>)
const editCharacter = async (req, res, next) => {
    //this will over
    const character = {
      characterName: req.body.characterName,
      playerName: req.body.playerName,
      race: req.body.race,
      class: req.body.class,
      level: req.body.level,
      alignment: req.body.alignment,
      stats: {
        str: req.body.stats.str,
        dex: req.body.stats.dex,
        con: req.body.stats.con,
        int: req.body.stats.int,
        wis: req.body.stats.wis,
        cha: req.body.stats.cha
      }
    };
    //console.log(character);

  try {
    
    const characterId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db("cse341-database").collection('characters').updateOne(
      {_id: characterId},
      //this will overwrite EVERYTHING; we can't change one field at a time (yet)
      {$set: {
        "characterName": character.characterName,
        "playerName": character.playerName,
        "race": character.race,
        "class": character.class,
        "level": character.level,
        "alignment": character.alignment,
        "stats": {
          "str": character.stats.str,
          "dex": character.stats.dex,
          "con": character.stats.con,
          "int": character.stats.int,
          "wis": character.stats.wis,
          "cha": character.stats.cha
        }
      }}
    );
    //console.log(result);

    //{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
    //Could add another nest for modifiedCount but to what end?
    if (result.matchedCount > 0) {
      //204 succeeds but doesn't navigate away
      //The relevant circumstance is I can't run json messages from it
      //But I'll leave it anyway or else it won't give me any response at all?!
      res.status(204).json({message: "Successfully updated character."});
    } else {
        //404 means does not exist
        res.status(404).json({message: "Can't find this character."});
    }
  } catch (err) {
    //500 means server error, not user error
    res.status(500).json({message: err.message});
  }
};


module.exports = { getCharacters, getCharacter, addCharacter, delCharacter, editCharacter};