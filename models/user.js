const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Emailid:{
        type: String,
        require: true
    }

})

module.exports = mongoose.model('User', userSchema)