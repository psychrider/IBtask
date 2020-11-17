const bodyparser = require("body-parser");

const express = require('express');

const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const User = mongoose.model('User', { Name: String , Emailid: String});
const Interview = mongoose.model('Interview', { Interviewer: String , Emailid: String, Timing: Date});

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.send('root!');
});

app.get('/newUser',(req,res)=>{ 
    res.render('newUser.ejs');
});

app.post('/newUser',(req,res)=>{  
    const d = new Date();
    const emp = new User({ Name: req.body.name, Emailid: req.body.email});
    emp.save();
    res.redirect('/interview');
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
            Interview.create({interviewer: req.body.name, Emailid: req.body.email, Timing: req.body.time}, (err, interview) => {
              if(err) {}
              res.redirect('/interview');
            })
        }
    })
});

app.post('/delete', async (req, res) => {
  Interview.deleteOne({interviewer: req.body.interviewer, Emailid: req.body.email}, err => {
    if(err) {
      res.json({n: "some err"});
    }
    else {
      res.redirect('/interview');
    }
  })
});

app.post('/update', async (req, res) => {
  Interview.find({interviewer: req.body.interviewer, Emailid: req.body.email}, (err, interview) => {
    if(err) {
      res.send(err);
    }
    else {
      interview.interviewer = interview.interviewer | req.body.interviewer;
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
            res.render('show-interview',{data});
        }
    })
})



app.listen(3000,()=>{
    console.log('servser is up..');
})