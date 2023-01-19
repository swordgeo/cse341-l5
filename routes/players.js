// const { Router } = require('express');
const express = require('express');
const routes = express.Router();



const playersController = require('../controllers/players');

routes.get('/', playersController.getPlayers);
routes.get('/:id', playersController.getPlayer);
routes.post('/', playersController.addPlayer);
routes.patch('/:id', playersController.editPlayer);
routes.delete('/:id', playersController.delPlayer);

module.exports = routes;

