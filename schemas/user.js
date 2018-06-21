var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var ASLT_WORK_FACTOR = 10

var userSchemas = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  password: String,
  role: {
    type: Number,
    default: 0
  },
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

userSchemas.pre('save', function (next) {
  var user = this

  if (this.isNew) {
    this.meta.creatAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  bcrypt.genSalt(ASLT_WORK_FACTOR, function (err, salt) {
    if (err) {
      next(err)
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        next(err)
      }

      user.password = hash

      next()
    })
  })
})

userSchemas.methods = {
  comparePassword: function (_password, cb) {
    bcrypt.compare(_password, this.password, function (err, isMatch) {
      if (err) {
        return cb(err)
      }
      cb(null, isMatch)
    })
  }
}

userSchemas.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  }
}

module.exports = userSchemas