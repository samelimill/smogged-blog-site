const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      const blogsData = await Blog.findAll({
        attributes: ['id', 'title', 'text', 'date_created'],
        include: [{
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment'],
        }],
        order: [['date_created', 'ASC']],
      });
  
      const pastBlogs = blogsData.map((blogs) => blogs.get({ plain: true }));
  
      res.render('homepage', {
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
router.get('/login', (req, res) => {
// If a session exists, redirect the request to the homepage
    res.render('login');
});

router.get('/homepage', (req,res) => {
  // if (!req.session.user) {
  //   return res.redirect('/login');
  // };
  res.render('homepage');
});
  
module.exports = router;
  