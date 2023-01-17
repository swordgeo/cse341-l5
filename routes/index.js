const routes = require('express').Router();




routes.use('/characters', require('./characters'));
routes.use('/players', require('./players'));
routes.use('/', require('./swagger-route'));
// routes.use('/test', require('./desperation'));

module.exports = routes;