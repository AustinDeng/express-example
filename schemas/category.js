var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var categorySchemas = new Schema({
  name: String,
  movies: [{ type: ObjectId, ref: 'movie' }],
  meta: {
    creatAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

categorySchemas.pre('save', function (next) {
  if (this.isNew) {
    this.meta.creatAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }
  next()
})

categorySchemas.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function (id, cb) {
    return this
      .findOne({ _id: id })
      .exec(cb)
  }
}

module.exports = categorySchemas