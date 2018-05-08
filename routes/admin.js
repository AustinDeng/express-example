var express = require('express')
var router = express.Router()
var movie = require('../modules/movies')
var _ = require('underscore')
var User = require('../modules/user')

var dataForm = {
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
}

var dataAdmin = {
  title: '后台管理页面',
  movies: [
    {
    title: '这是名字',
    _id: 1,
    director: '导演',
    country: '国家',
    year: '2018',
    poster: '',
    language: '',
    flash: '',
    summary:'这是简介'
  }
]
}

router.get('/movie', function(req, res, next){
  // res.render('admin', dataAdmin)
  movie.fetch(function(err, movies){
    if(err){
      res.render('error')
    }
    res.render('admin', {
      title: '后台管理页面',
      movies: movies
    })
  })
})

router.get('/userlist', function(req, res, next){
  // res.render('admin', dataAdmin)
  User.fetch(function(err, users){
    if(err){
      res.render('error')
    }
    res.render('userlist', {
      title: '后台用户管理页面',
      users: users
    })
  })
})

router.get('/update/:id', function(req, res, next){
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
})

router.get('/form', function(req, res, next){
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
})

router.post('/movie/new', function(req, res, next){
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
})

router.delete('/movie', function(req, res){
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
})

module.exports = router