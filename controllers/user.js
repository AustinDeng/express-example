var User = require('../modules/user')
var movie = require('../modules/movies')

exports.Signup = function(req, res, next) {
  var _user = req.body.user
  User.findOne({ name: _user.name }, function (err, user) {
    if (err) {
      console.log(err)
    }
    if (user) {
      console.log('用户存在')
      res.redirect('/')
    }
    else {
      var user = new User(_user)
      user.save(function (err, user) {
        if (err) {
          console.log(err)
        }
        console.log(user)
        res.redirect('/admin/userlist')
      })
    }
  })
}

exports.Signin = function (req, res, next) {
  var _user = req.body.user
  var name = _user.name
  var password = _user.password

  User.findOne({ name: name }, function (err, user) {
    if (err) {
      console.log(err)
    }
    if (!user) {
      console.log("用户不存在！")
      res.redirect('/')
      return
    }

    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        console.log(err)
      }
      if (isMatch) {
        console.log("Password is matched!")
        req.session.user = user
        res.redirect('/')
      }
      else {
        console.log("Password is not matched!")
        res.redirect('/')
      }
    })
  })
}