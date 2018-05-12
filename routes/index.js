var admin = require('../controllers/admin')
var index = require('../controllers/index')
var user = require('../controllers/user')
var comment = require('../controllers/comment')

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
  
  app.get('/user/signup', user.showSignup)  // 用户注册页面
  app.get('/user/signin', user.showSignin)  // 用户登录页面
  app.post('/user/signup', user.Signup)  // 用户注册表单提交页
  app.post('/user/signin', user.Signin)  // 用户登录表单提交
  app.post('/user/comment', user.signinRequired, comment.save) // 用户评论表单提交
  
  app.get('/admin/movie/list', user.signinRequired, admin.adminRequired, admin.movie)  // 后台电影管理页
  app.get('/admin/user/list', user.signinRequired, admin.adminRequired, admin.userlist)  // 后台用户管理页
  app.get('/admin/movie/update/:id', user.signinRequired, admin.adminRequired, admin.update)  // 电影信息更新页
  app.get('/admin/movie/form', user.signinRequired, admin.adminRequired, admin.form)  // 电影上传表单页
  app.post('/admin/movie/new', user.signinRequired, admin.adminRequired, admin.new)  // 电影上传表单提交页
  app.delete('/admin/movie/delete', user.signinRequired, admin.adminRequired, admin.delete)  // 后台电影删除页
}
