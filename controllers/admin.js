var movie = require('../modules/movies')
var _ = require('underscore')
var User = require('../modules/user')

exports.movie = function(req, res, next){
  movie.fetch(function(err, movies){
    if(err){
      res.render('error')
    }
    res.render('admin', {
      title: '后台管理页面',
      movies: movies
    })
  })
}

exports.userlist = function(req, res, next){
  User.fetch(function(err, users){
    if(err){
      res.render('error')
    }
    res.render('userlist', {
      title: '后台用户管理页面',
      users: users
    })
  })
}

exports.update = function(req, res, next){
  var id = req.params.id
  if(id){
    movie.findById(id, function(err, Movie){
      if(err){
        res.render('error')
        return
      }
      res.render('form', {
        title: '后台表单更新页面',
        movie: Movie
      })
    })
  }  
}

exports.form = function(req, res, next){
  res.render('form', {
    title: '后台表单提交页面',
    movie: {
      _id: '',
      title: '',
      director: '',
      country: '',
      year: '',
      poster: '',
      language: '',
      flash: '',
      summary:''
  }
  })
}

exports.new =  function(req, res, next){
  console.log(req.body)
  var id = req.body.movie._id
  var movieObj = req.body.movie
  var _movie

  if(id !== ''){
    movie.findById(id, function(err, Movie){
      if(err){
        res.render('error')
        return
      }
      _movie = _.extend(Movie, movieObj)
      _movie.save(function(err, movie){
        if(err){
          res.render('error')
          return
        }
        res.redirect('/movie/'+movie._id)
      })
    })
  }
  else{
    _movie = new movie({
      director: movieObj.director,
      title: movieObj.title,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash
    })
    _movie.save(function(err, movie){
      if(err){
        res.render('error')
        return
      }
      res.redirect('/movie/' + movie._id)
    })
  }
}

exports.delete = function(req, res){
  var id = req.query.id
  if(id){
    movie.remove({_id: id},function(err,Movie){
      if(err){
        console.log(err)
        return
      }
      res.json({
        success: 1
      })
    })
  }
}

// 中间件
exports.adminRequired = function(req, res, next){
  var user = req.session.user
  if( user.role < 10 ){
    console.log("没有管理员权限")
    res.redirect('/')
  }
  next()
}