const express = require('express');
const app = express();
const mongodb = require('./db/connect');

const port = process.env.PORT || 3000;

//meddling to attempt extra credit lesson 4
const bodyParser = require('body-parser');

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE');
    next();
  })
  .use('/', require('./routes'));

//These two worked before I started gunning for extra credit, revert if necessary

//app.use(express.json());
//app.use('/', require('./routes'))// http://localhost:3000

//only if mongodb is connected do we listen

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

