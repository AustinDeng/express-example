var Comment = require('../modules/comment')

exports.save = function(req, res, next){
  var _comment = req.body.comment
  var movieId = _comment.movie
  var comment = new Comment(_comment)

  comment.save(function(err, comment){
    if(err){
      console.log(err)
    }

    res.redirect('/movie/' + movieId)
  })
  
}