var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var ASLT_WORK_FACTOR = 10

var userSchemas = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  password: String,
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

module.exports = userSchemas