'use strict';
const dotenv = require('dotenv');

dotenv.load({
  path: '.env.production'
});

module.exports = {
  NODE_ENV: '"production"',
  apikey: JSON.stringify(process.env.ALPHAVANTAGE),
  socketUrl: JSON.stringify(process.env.socketUrl),
  baseURL: JSON.stringify(process.env.baseURL)
};
