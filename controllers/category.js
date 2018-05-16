var Category = require('../modules/category')


exports.categoryform = function (req, res, next) {
  res.render('category_admin', {
    title: '后台分类表单提交页面',
    category: {
      name: '',
    }
  })
}

exports.new = function (req, res, next) {
    var _category = req.body.category
    var category = new Category(_category)

    category.save(function (err, category) {
      if (err) {
        res.render('error')
        return
      }
      res.redirect('/admin/category/list')
    }) 
}

exports.categorylist = function(req, res, next){
  Category.fetch(function(err, categories){
    console.log(categories)
    if(err){
      res.render('error')
    }
    res.render('category_list', {
      title: '后台分类管理页面',
      categories: categories
    })
  })
}