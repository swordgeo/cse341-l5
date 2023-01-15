const routes = require('express').Router();




routes.use('/characters', require('./characters'))
routes.use('/', require('./swagger-route'))

module.exports = routes;