var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
     title: '电影首页' 
    })
})

router.get('/movie/:id', function(req, res, next){
  res.render('detail',{
    title: '电影详情页'
  })
})

module.exports = router
