var mongoose = require('mongoose')
var userSchemas = require('../schemas/user')

var user = mongoose.model('user', userSchemas)

module.exports = user