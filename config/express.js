var config = require("./config")
var express = require('express') //working compile time
var morgan = require('morgan')
var compression = require('compression')
var bodyParser = require('body-parser')
var sass  = require('node-sass-middleware')
var validator = require('express-validator')
var cookieSession = require('cookie-session')
var session = require('express-session')
var passport = require('passport')
module.exports = function() {
    var app = express()    
    if(process.env.NODE_ENV === 'develop'){
        console.log('dev mode')
        app.use(morgan('dev'))
    }else{
        app.use(compression)
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }))  

    app.use(cookieSession({
        name: 'session',
        keys:['secret_key1','secret_key2']
    }))
      app.use(session({
        secret: config.sessionSecret,
        resave: false,
  saveUninitialized: true, 
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    app.use(bodyParser.json())
    app.use(validator())
    app.set('views','./app/views')// set working won runtime
    app.set('view engine','jade')
    app.use(sass({
        src:'./sass',
        dest:'./public/css',
        outputStyle:'expanded',
        prefix: '/css',
        debug: true,
        indentedSyntax: true
    }))
    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json())

    require('../app/routes/index.routes')(app)
    require('../app/routes/user.routes')(app)
   
    app.use(express.static('public'))
    return app
}