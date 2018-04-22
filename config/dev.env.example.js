'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DOMAIN: '"https://codeshark.io/"',
  API_URL: '"https://codeshark.io/api/"',
  API_VERSION: '""',
  G_ZIP: false,
  GTM_DEBUG: true
})
