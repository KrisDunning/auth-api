'use strict';
require('dotenv').config();

const app = require('./src/server.js');
const { db } = require('./src/models');
const server = require('./src/server.js');

db.sync().then(() => {
  server.startAPI(3000);
  app.startAUTH(process.env.PORT || 3001);
});
