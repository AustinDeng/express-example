var express = require('express')
var router = express.Router()
var movie = require('../modules/movies')

var dataIndex = {
  title: '电影首页',
  movies: [
    {
      title: '巴霍巴利王2：终结',
      _id: 1,
      poster: 'http://p0.meituan.net/movie/3e42788f6f6283f430e74ac2381dd6ad151806.jpg@464w_644h_1e_1c'
    },
    {
      title: '巴霍巴利王2：终结',
      _id: 2,
      poster: 'http://p0.meituan.net/movie/3e42788f6f6283f430e74ac2381dd6ad151806.jpg@464w_644h_1e_1c'
    },
    {
      title: '巴霍巴利王2：终结',
      _id: 3,
      poster: 'http://p0.meituan.net/movie/3e42788f6f6283f430e74ac2381dd6ad151806.jpg@464w_644h_1e_1c'
    },
    {
      title: '巴霍巴利王2：终结',
      _id: 4,
      poster: 'http://p0.meituan.net/movie/3e42788f6f6283f430e74ac2381dd6ad151806.jpg@464w_644h_1e_1c'
    },
    {
      title: '巴霍巴利王2：终结',
      _id: 5,
      poster: 'http://p0.meituan.net/movie/3e42788f6f6283f430e74ac2381dd6ad151806.jpg@464w_644h_1e_1c'
    },
    {
      title: '巴霍巴利王2：终结',
      _id: 6,
      poster: 'http://p0.meituan.net/movie/3e42788f6f6283f430e74ac2381dd6ad151806.jpg@464w_644h_1e_1c'
    },
    {
      title: '巴霍巴利王2：终结',
      _id: 7,
      poster: 'http://p0.meituan.net/movie/3e42788f6f6283f430e74ac2381dd6ad151806.jpg@464w_644h_1e_1c'
    },
  ]
}

var dataDetail = {
  title: '电影详情页',
  movie: {
    director: 'S·S·拉贾穆里',
    title: '巴霍巴利王2：终结',
    country: '印度',
    language: 'English',
    year: '2018',
    flash:'http://player.youku.com/embed/XODY3NDMzNjY4',
    summary: "同蛮族的大战以摩喜施末底的胜利而告终，根据战场上的表现，希瓦伽米太后（拉姆亚·克里希南饰）选择了养子阿玛兰德拉·巴霍巴利（帕拉巴斯饰）作为王国的王储。在加冕典礼之前太后交给巴霍巴利的最后一项任务是游历王国，体察臣民的疾苦，理解'臣民的审判'。同时，太后还竭尽全力满足自己的亲子巴拉拉德夫德斯（纳拉·达古巴提饰）的各种需求，希望能够克制他的贪婪，平衡兄弟的关系。巴霍巴利经过一个叫昆达拉的诸侯小国时，偶遇美丽绝伦、剑术高超的提婆犀那公主（安努舒卡·谢蒂饰），立刻惊为天人，无以自拔。"
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  movie.fetch(function(err, movies){
    if(err){
      res.render('error')
      return
    }
    res.render('index', {
      title: '电影首页',
      movies: movies
    })
  })
})

router.get('/movie/:id', function(req, res, next){
  // res.render('detail', dataDetail)
  var id = req.params.id
  movie.findById(id, function(err, Movie){
    if(err){
      res.render('error')
      return
    }
    res.render('detail', {
      title: '电影详情页',
      movie: Movie
    })
  })
})

module.exports = router
