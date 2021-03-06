// var User = require('../modules/user')
var movie = require('../modules/movies')
var Comment = require('../modules/comment')
var Category = require('../modules/category')

// 分页
var COUNT = 2

exports.Index = function (req, res) {
  Category
    .find({})
    .populate({ path: 'movies', option: { limit: 5 } })
    .exec(function (err, categories) {
      // movie.fetch(function (err, movies) {
      if (err) {
        res.render('error')
        return
      }
      res.render('index', {
        title: '电影首页',
        categories: categories
      })
    }
    )
}

exports.Delite = function (req, res) {
  var id = req.params.id

  movie.update({_id: id}, {$inc:{pv:1}},function(err){
    if(err){
      console.log(err)
    }
  })
  
  movie.findById(id, function (err, Movie) {
    if (err) {
      res.render('error')
      return
    }
    Comment.find({ movie: id })
      .populate('from', 'name')
      .populate('reply.from reply.to', 'name')
      .exec(function (err, comments) {
        res.render('detail', {
          title: '电影详情页',
          movie: Movie,
          comments: comments
        })
      })
  })
}

exports.Search = function (req, res) {
  var cateId = req.query.cate
  var page = parseInt(req.query.p, 10) || 0
  var index = page * COUNT
  var q = req.query.q  // 取得关键字查询

  // 分类查询，返回分类后的电影
  if (cateId) {
    Category
      .find({ _id: cateId })
      .populate({ path: 'movies', select: 'title poster' })
      .exec(function (err, categories) {
        // movie.fetch(function (err, movies) {
        if (err) {
          res.render('error')
          return
        }

        var category = categories[0] || {}
        var movies = category.movies || []
        var results = movies.slice(index, index + COUNT)

        res.render('results', {
          title: '结果列表页',
          keyword: category.name,
          currentPage: (page + 1),
          query: 'cate=' + cateId,
          totalPage: Math.ceil(movies.length / COUNT),
          movies: results
        })
      })
  }
  // 关键字查询电影
  else{
    movie
      .find({title: new RegExp(q + '.*', 'i')})
      .exec(function(err, movies){
        if (err) {
          res.render('error')
          return
        }
        
        var results = movies.slice(index, index + COUNT)
        res.render('results', {
          title: '结果列表页',
          keyword: q,
          currentPage: (page + 1),
          query: 'q=' + q,
          totalPage: Math.ceil(movies.length / COUNT),
          movies: results
        })
      })
  }
}