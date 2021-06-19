const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('user', userSchema);