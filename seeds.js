const mongoose     = require('mongoose');
const User = require('./models/user');



mongoose.connect('mongodb://localhost:27017/portal', { // Connection to database
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

const u = new User({
    Name: 'abc',
    Emailid: '123@gmail.com' 
})
u.save().then(u=>{
    console.log(u);
})
    .catch(e => {
        console.log(e);
    })