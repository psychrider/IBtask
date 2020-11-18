const mongoose = require('mongoose')
const interviewSchema = new mongoose.Schema({
    Interviewer:{
        type: String,
        required: true
    },
    Emailid:{
        type: String,
        require: true
    },
    Timing:{
        type: Date,
        require: true
    }

})

module.exports = mongoose.model('Interview', interviewSchema)