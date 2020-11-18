const express = require('express')
const User = require('./../models/User')
const router = express.Router()

app.get('/newUser',(req,res)=>{ 
  res.render('newUser.ejs');
});

app.post('/newUser',(req,res)=>{  
  const d = new Date();
  const emp = new User({ Name: req.body.name, Emailid: req.body.email});
  emp.save();
  res.redirect('/interview');
});


router.post('/', async (req, res, next) => {
  req.article = new Article()
  next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    try {
      article = await article.save()
      res.redirect(`/articles/${article.slug}`)
    } catch (e) {
      res.render(`articles/${path}`, { article: article })
    }
  }
}

module.exports = router

