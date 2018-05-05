var mongoose = require('mongoose')
var movieSchemas = require('../schemas/movie')

var movie = mongoose.model('movie', movieSchemas)

module.exports = movie