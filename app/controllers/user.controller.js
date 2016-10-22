var User = require('mongoose').model('User')
exports.delete = function(req, res, next){
    User.remove(function(err){
        if(err){
            return next(err)
        }else {
            res.json(req.user)
        }
    })
}
exports.update = function(req, res, next){
    User.findOneAndUpdate({username:req.user.username},req.body,
    function(err, user){
        if(err) {
            return next(err)
        }else{
            res.json(user)
        }
    })
}

exports.list = function(req, res, next){
    User.find({} , function(err, users){
        if(err){
            return next(err)
        } else {
            res.json(users)
        }
    }) 
}
exports.read = function (req, res){
    res.json(req.user)
}
exports.userByUsername = function(req, res, next, username ){
        User.findOne({
            username: username // right is param from 
        }, function(err, user){
            if(err){
                return next(err)
            }else {
                req.user = user
                next()
            }
        })
}
exports.create = function(req, res, next)
{
    var user = new User(req.body)
    user.save(function(err){
        if(err){
            return next(err)
        }else{
            res.json(user)        
        }
    })
}
exports.login = function( req , res)
{    
    if(req.body.remember === 'remember'){
        req.session.remember = true
        req.session.email = req.body.email
        req.session.cookie.maxAge=6000
    }

    req.checkBody('email','Invalid email').notEmpty().isEmail()
    req.sanitizeBody('email').normalizeEmail()
    var error = req.validationErrors()    
    if(error)
    {
        res.render('index', {
            title: 'There have been validation errors'+JSON.stringify(errors),
            isLoggedIn: false
        })
        return    
    }
    console.log(req.body)
    console.log('Email: '+req.body.email)
    console.log('Password: '+req.body.password)
    res.render('index', {
        title: 'Logged in as ' + req.body.email ,
        isLoggedIn: true
    } )
}

exports.logout = function( req , res)
{
    req.session = null
    res.render('index', {
        title: 'See you again later ' ,
    isLoggedIn: false } )

}