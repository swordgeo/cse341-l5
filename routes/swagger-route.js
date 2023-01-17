//The original code as it was

const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');



router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;

// ------


//Attempt 1

// const express = require('express');
// const app = express();
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger-output.json');

// var options = {
//     swaggerOptions: {
//         url: "/api-docs/swagger.json",
//     },
// }
// app.get("/api-docs/swagger.json", (req, res) => res.json(swaggerDocument));
// app.use('/api-docs', swaggerUi.serveFiles(null, options), swaggerUi.setup(null, options));


//Attempt 2

// const express = require('express');
// const app = express();
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger-output.json');

// var options = {
//     swaggerOptions: {
//         url: "/api-docs/swagger.json",
//     },
// }
// app.get("/api-docs/swagger.json", (req, res) => res.json(swaggerDocument));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,options));


//module.exports = router;


//Attempt 3

// const express = require('express');
// const app = express();
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger-output.json');

// var options = {
//     swaggerOptions: {
//         url: "/api-docs/swagger.json",
//     },
// }
// app.get("/api-docs/swagger.json", (req, res) => res.json(swaggerDocument));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,options));
// app.listen(3000, () => {
//     console.log("Server started on port 3000");
// });


//Attempt 4

// const router = require('express').Router();

// const express = require('express');
// const app = express();
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger-output.json');

// var options = {
//     swaggerOptions: {
//         url: "/api-docs/swagger.json",
//     },
// }
// app.get("/api-docs/swagger.json", (req, res) => res.json(swaggerDocument));
// app.use('/api-docs', swaggerUi.setup(swaggerDocument,options));
// // app.listen(3000, () => {
// //     console.log("Server started on port 3000");
// // });

// // app.use("/api-docs/swagger.json", express.static(__dirname + '../swagger-output.json'));

// module.exports = router;