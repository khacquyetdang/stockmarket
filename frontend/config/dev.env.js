'use strict';
const dotenv = require('dotenv');

dotenv.load({
  path: '.env.development'
});

module.exports = {
  NODE_ENV: '"development"',
  apikey: JSON.stringify(process.env.ALPHAVANTAGE)
};
