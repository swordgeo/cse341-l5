const express = require('express');
const app = express();
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE');
    next();
  })
  .use('/', require('./routes'));



//only if mongodb is connected do we listen

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

