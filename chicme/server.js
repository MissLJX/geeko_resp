const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/chicme')

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log('collection success...')
})

var UserSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    createDate: {type: Date, default: Date.now()}
})

UserSchema.methods.hello = () => {console.log('hello world')}


const User = mongoose.model('User', UserSchema)



var user = new User()

user.name = 'li jin xia'
user.email = 'lijinxia@163.com'

user.save((err, docs) => {
    if (err) return console.log(err)
    console.log(docs)
})

user.hello()
