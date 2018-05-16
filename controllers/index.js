var User = require('../modules/user')
var movie = require('../modules/movies')
var Comment = require('../modules/comment')
var Category = require('../modules/category')

exports.Index = function (req, res, next) {
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

exports.Delite = function (req, res, next) {
  var id = req.params.id
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