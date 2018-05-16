var mongoose = require('mongoose')
var categorySchemas = require('../schemas/category')

var category = mongoose.model('category', categorySchemas)

module.exports = category
