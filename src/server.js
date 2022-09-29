'use strict';

//api-server const's
const express = require('express');
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const v1Routes = require('./routes/v1.js');
const v2Routes = require('./routes/v2.js');
/////////////////////

//auth-server const's
// 3rd Party Resources
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const authRoutes = require('./routes/routes.js');
// Prepare the express app
const app = express();
/////////////////////////
// api-server app.use's
app.use(express.json());
app.use(logger);
app.use('/api/v1', v1Routes);
app.use('/api/v2',v2Routes);
// app.use('*', notFoundHandler);
// app.use(errorHandler);
////////////////////////
// auth-server app use's

// App Level MW
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
// Routes
app.use(authRoutes);
// Catchalls
app.use(notFoundHandler);
app.use(errorHandler);

//combined exports
module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
//   startAuth: (port) => {
//     app.listen(port, () => {
//       console.log(`Server Up on ${port}`);
//     });
// },
};

