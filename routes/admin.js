var express = require('express')
var router = express.Router()
var movie = require('../modules/movies')
var _ = require('underscore')

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
  else{
    res.redirect('/') // 不知道这样可不可以
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
      _movie = _.extend(movie, movieObj)
      _movie.save(function(err, movie){
        if(err){
          res.render('error')
          return
        }
        res.redirect('/movie'+movie._id)
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

module.exports = router