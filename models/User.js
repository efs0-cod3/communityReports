// this is a schema for all the fields that we will need from the user
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        requiered: true
    },
    user: {
        type: String,
        requiered: true
    },
    email: {
        type: String,
        requiered: true
    },
    password: {
        type: String,
        requiered: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


const User = mongoose.model('User', UserSchema)

module.exports = User
 // this to be able to use User in other files