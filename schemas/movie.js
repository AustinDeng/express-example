var mongoose = require('mongoose')

var movieSchemas = new mongoose.Schema({
  title: String,
  poster: String,
  director: String,
  country: String,
  language: String,
  year: Number,
  summary: String,
  flash: String,
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

movieSchemas.static('fetch', function(cb){
  return this.find({}).sort('meta.updateAt').exec(cb)
})

movieSchemas.static('findByID', function(cb){
  return this.find({_id: id}).exec(cb)
})

module.exports = movieSchemas