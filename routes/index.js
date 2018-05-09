var admin = require('../controllers/admin')
var index = require('../controllers/index')
var user = require('../controllers/user')

module.exports = function (app) {
  // pre handle user
  app.use(function (req, res, next) {
    var _user = req.session.user
    app.locals.user = _user
    next()
  })
  // 用户登出
  app.get('/logout', function (req, res, next) {
    delete req.session.user
    delete app.locals.user
    res.redirect('/')
  })
  
  app.get('/', index.Index)  //电影首页
  app.get('/movie/:id', index.Delite)  // 电影详情页
  
  app.post('/user/signup', user.Signup)  // 用户注册表单提交页
  app.post('/user/signin', user.Signin)  // 用户登录表单提交
  
  app.get('/admin/movie', admin.movie)  // 后台电影管理页
  app.get('/admin/userlist', admin.userlist)  // 后台用户管理页
  app.get('/admin/update/:id', admin.update)  // 电影信息更新页
  app.get('/admin/form', admin.form)  // 电影上传表单页
  app.post('/admin/movie/new', admin.new)  // 电影上传表单提交页
  app.delete('/admin/movie', admin.delete)  // 后台电影删除页
}
