'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DOMAIN: '"http://xxxxx"',
  API_URL: '"http://xxxxx"',
  API_WS: '"http://xxxxxxx"',
  API_AUTH: '"http://xxxxxx"',
  API_VERSION: '""',
  G_ZIP: false,
  GTM_DEBUG: true
})
