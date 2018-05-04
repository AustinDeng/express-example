var express = require('express')
var router = express.Router()

router.get('/movie', function(req, res, next){
  res.render('admin', {
    title: '后台管理页'
  })
})

router.get('/form', function(req, res, next){
  res.render('form',{
    title: '后台上传表单'
  })
})

module.exports = router