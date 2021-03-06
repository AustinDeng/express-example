var movie = require('../modules/movies')
var _ = require('underscore')
var Category = require('../modules/category')
var User = require('../modules/user')
var fs = require('fs')
var path = require('path')

exports.savePoster = function (req, res, next) {
  var posterData = req.files.uploadPoster
  var filePath = posterData.path
  var originalFilename = posterData.originalFilename

  if (originalFilename) {
    fs.readFile(filePath, function (err, data) {
      var timestamp = Date.now()
      var type = posterData.type.split('/')[1]
      var poster = timestamp + '.' + type
      var newPath = path.join(__dirname, '../', '/public/upload/' + poster)

      fs.writeFile(newPath, data, function (err) {
        if (err) {
          console.error(err)
        }
        req.poster = poster
        next()
      })
    })
  }
  else {
    next()
  }
}

exports.movie = function (req, res) {
  movie.fetch(function (err, movies) {
    if (err) {
      res.render('error')
    }
    res.render('admin', {
      title: '后台管理页面',
      movies: movies
    })
  })
}

exports.userlist = function (req, res) {
  User.fetch(function (err, users) {
    if (err) {
      res.render('error')
    }
    res.render('userlist', {
      title: '后台用户管理页面',
      users: users
    })
  })
}

exports.update = function (req, res) {
  var id = req.params.id
  if (id) {
    movie.findById(id, function (err, Movie) {
      if (err) {
        res.render('error')
        return
      }
      Category.find({}, function (err, categories) {
        res.render('form', {
          title: '后台表单更新页面',
          movie: Movie,
          categories: categories
        })
      })
    })
  }
}

exports.form = function (req, res) {
  Category.find({}, function (err, categories) {
    res.render('form', {
      title: '后台电影表单提交页面',
      categories: categories,
      movie: {
        _id: '',
        title: '',
        director: '',
        country: '',
        year: '',
        poster: '',
        language: '',
        flash: '',
        summary: ''
      }
    })
  })
}

exports.new = function (req, res) {
  var id = req.body.movie._id
  var movieObj = req.body.movie
  var _movie

  if (req.poster) {
    movieObj.poster = req.poster
  }

  if (id) {
    movie.findById(id, function (err, Movie) {
      if (err) {
        console.log(err)
      }
      _movie = _.extend(Movie, movieObj)
      _movie.save(function (err, movie) {
        if (err) {
          res.render('error')
          return
        }
        res.redirect('/movie/' + movie._id)
      })
    })
  }
  else {
    _movie = new movie(movieObj)

    var categoryId = movieObj.category
    var categoryName = movieObj.categoryName

    _movie.save(function (err, movie) {
      if (err) {
        console.log(err)
      }

      if (categoryId) {
        Category.findById(categoryId, function (err, category) {
          category.movies.push(movie._id)
          category.save(function (err) {
            if (err) {
              console.log(err)
            }
            res.redirect('/movie/' + movie._id)
          })
        })
      }
      else if (categoryName) {
        var category = new Category({
          name: categoryName,
          movies: [movie._id]
        })

        category.save(function (err, category) {
          movie.category = category._id
          movie.save(function (err, movie) {
            res.redirect('/movie/' + movie._id)
          }
          )
        })
      }
    })
  }
}

exports.delete = function (req, res) {
  var id = req.query.id
  if (id) {
    movie.remove({ _id: id }, function (err) {
      if (err) {
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
exports.adminRequired = function (req, res, next) {
  var user = req.session.user
  if (user.role < 10) {
    console.log('没有管理员权限')
    res.redirect('/')
  }
  next()
}