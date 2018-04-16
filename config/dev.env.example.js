'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DOMAIN: '"http://codeshark.io/"',
  API_URL: '"http://codeshark.io/api/"',
  API_VERSION: '""'
})
