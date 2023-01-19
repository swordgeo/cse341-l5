// const { Router } = require('express');
const express = require('express');
const routes = express.Router();
const Character = require('../models/character');



const charactersController = require('../controllers/characters');

routes.get('/', charactersController.getCharacters); 
routes.get('/:id', charactersController.getCharacter);
routes.post('/', charactersController.addCharacter);
routes.patch('/:id', charactersController.editCharacter);
routes.delete('/:id', charactersController.delCharacter);

module.exports = routes;

