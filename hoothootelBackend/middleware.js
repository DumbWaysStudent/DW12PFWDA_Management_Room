const jwt = require('express-jwt')
const {SECRET} = require('./secret')

exports.authenticated = jwt({secret: SECRET})