var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var Category = require('../modules/category')

var movieSchemas = new mongoose.Schema({
  title: String,
  poster: String,
  director: String,
  country: String,
  language: String,
  year: Number,
  pv: {
    type: Number,
    default: 0
  },
  summary: String,
  flash: String,
  category: {
    type: ObjectId,
    ref: 'Category'
  },
  meta: {
    creatAt: {
      type: Date,
      default:Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

movieSchemas.pre('save',function(next){
  if(this.isNew){
    this.meta.creatAt = this.meta.updateAt = Date.now()
  }
  else{
    this.meta.updateAt = Date.now()
  }
  next()
})

movieSchemas.statics = {
	fetch:function(cb){
		return this
		  .find({})
		  .sort('meta.updateAt')
		  .exec(cb)
	},
	findById:function(id,cb){
		return this
		  .findOne({_id:id})
		  .exec(cb)
	}
}

module.exports = movieSchemas