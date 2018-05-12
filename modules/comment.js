var mongoose = require('mongoose')
var commentSchemas = require('../schemas/comment')

var comment = mongoose.model('comment', commentSchemas)

module.exports = comment