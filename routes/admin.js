var express = require('express')
var router = express.Router()

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
  res.render('admin', dataAdmin)
})

router.get('/form', function(req, res, next){
  res.render('form',dataForm)
})

module.exports = router