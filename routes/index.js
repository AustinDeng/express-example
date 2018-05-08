var express = require('express')
var router = express.Router()
var movie = require('../modules/movies')
var User = require('../modules/user')

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.session.user)
  movie.fetch(function (err, movies) {
    if (err) {
      res.render('error')
      return
    }
    res.render('index', {
      title: '电影首页',
      movies: movies
    })
  })
})

router.get('/movie/:id', function (req, res, next) {
  // res.render('detail', dataDetail)
  var id = req.params.id
  movie.findById(id, function (err, Movie) {
    if (err) {
      res.render('error')
      return
    }
    res.render('detail', {
      title: '电影详情页',
      movie: Movie
    })
  })
})

router.post('/user/signup', function (req, res, next) {
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
})

router.post('/user/signin', function(req, res, next){
  var _user = req.body.user
  var name = _user.name
  var password = _user.password

  User.findOne({name: name}, function(err, user){
    if(err){
      console.log(err)
    }
    if(!user){
      console.log("用户不存在！")
      res.redirect('/')
      return
    }

    user.comparePassword(password, function(err, isMatch){
      if(err){
        console.log(err)
      }
      if(isMatch){
        console.log("Password is matched!")
        req.session.user = user
        res.redirect('/')
      }
      else{
        console.log("Password is not matched!")
        res.redirect('/')
      }
    })

  }) 
})

module.exports = router
