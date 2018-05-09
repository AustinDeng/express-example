var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')

var index = require('./routes/index')


var mongoose = require('mongoose')
var mongoStore = require('connect-mongo')(session)

const DATABASE_URL = 'mongodb://deng:123456@127.0.0.1:27017/admin'

mongoose.Promise = global.Promise
mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log("Mongodb connection successful!")
  })
  .catch((err) => {
    console.error( `App starting error: ${ err.stack}`)
    process.exit(1)
  })

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(session({
  secret: 'deng',
  store: new mongoStore({
    url: DATABASE_URL,
    collection: 'sessions'
  })
}))

// 设置资源文件目录
app.use(express.static(path.join(__dirname, 'public')))

app.locals.moment = require('moment') // 载入moment模块，格式化日期

if('development' === app.get('env')){
  app.set('showStackError', true)
  app.locals.pretty = true
  mongoose.set('debug', true)
}

// app.use('/', index)
// app.use('/admin', admin) 

require('./routes/index')(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error',{
    title: '出现错误',
    error: err
  })
})

module.exports = app
