var mongoose = require('mongoose')
var Schemas = mongoose.Schema
var ObjectId = Schemas.Types.ObjectId

var commentSchemas = new Schemas({
  movie: {type: ObjectId, ref: 'movie'},
  from: {type: ObjectId, ref: 'user'},
  reply: [{
    from: {type: ObjectId, ref: 'user'},
    to: {type: ObjectId, ref: 'user'},
    content: String
  }],
  content: String,
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

commentSchemas.pre('save',function(next){
  if(this.isNew){
    this.meta.creatAt = this.meta.updateAt = Date.now()
  }
  else{
    this.meta.updateAt = Date.now()
  }
  next()
})

commentSchemas.statics = {
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

module.exports = commentSchemas