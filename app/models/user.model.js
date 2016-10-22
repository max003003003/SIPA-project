var mongoose = require('mongoose')
var Schema = mongoose.Schema
var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: {type: String , uniqe: true ,trim: true ,require: true},
    email: {type: String, index: true , match: /.+\@.+\.+/ },
    password: {type: String ,validate: [
        function(password){
            return password && password.length >=6 
        },
        'Password must be at least 6 chacacters'
    ]},
    role: {
        type: String,
        enum: ['Admid','Owner','User']
    },
    created: {
        type: Date,
        default: Date.now
        
    }
})
mongoose.model('User',UserSchema)