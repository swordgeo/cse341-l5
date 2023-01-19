require('dotenv').config();
const express = require('express');
const app = express();
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
const db  = mongoose.connection;
db.on('error', (error ) => console.error(error))
db.once('open', () => console.log('Connected to Database'));

const port = process.env.PORT || 3000;

//go to routes
app 
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, OPTIONS, DELETE');
    next();
  })
  .use('/', require('./routes'));



//only if mongodb is connected do we listen

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

