const bodyparser = require("body-parser");
const express = require('express');
const app = express();
const mongoose     = require('mongoose');


const Interview = require('./models/interview');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/portal', { // Connection to database
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));


app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));


app.get('/',(req,res)=>{
    res.send('root!');
});

app.get('/newUser',(req,res)=>{ 
    res.render('newUser.ejs');
});

app.post('/newUser',async (req,res)=>{ 
    console.log(req.body);
    const emp = new User({ 
        Name: req.body.name,
        Emailid: req.body.email
    });
    emp.save().then(emp =>{
        console.log(emp);
        res.redirect('/users');
    })
    .catch(err => {
        console.log(err);
    })
    
});

app.get('/new',(req,res)=>{ 
    res.render('newInterview.ejs');
});

app.post('/new',async (req,res)=>{
    console.log(req.body);
    await User.find({Emailid:req.body.email}, (err, result)=>{
        if (err){
            console.log(err);
        }
        else {
            Interview.create({Interviewer: req.body.name, Emailid: req.body.email, Timing: req.body.time}, (err, interview) => {
              if(err) {}
              //console.log(interview)
              res.redirect('/interview');
            })
        }
    })
});

app.post('/delete', async (req, res) => {
  Interview.deleteOne({_id: req.body.id}, err => {
    if(err) {
      res.json({n: "some err"});
    }
    else {
      res.redirect('/interview');
    }
  })
});

app.post('/update', async (req, res) => {
  Interview.find({Interviewer: req.body.interviewer, Emailid: req.body.email}, (err, interview) => {
    if(err) {
      res.send(err);
    }
    else {
      interview.Interviewer = interview.Interviewer | req.body.interviewer;
      interview.Emailid = interview.Emailid | req.body.email;
      interview.Timing = interview.Timing | req.body.time;
      interview.save().then(res.redirect('/interview'));
    }
  })
});

app.get('/interview',(req,res)=>{
    Interview.find({},(err,data)=>{
        if(err){
            res.send('err',err);
        }
        else{
            //console.log(data);
            res.render('show-interview',{data});
        }
    })
})

app.get('/users',(req,res)=>{
    User.find({},(err,data)=>{
        if(err){
            res.send('err',err);
        }
        else{
            //console.log(data);
            res.render('show-user',{data});
        }
    })
})


app.listen(3000,()=>{
    console.log('server is up...'); 
})