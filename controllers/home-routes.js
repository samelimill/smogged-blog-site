const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      const blogData = await Blog.findAll({
        include: [{
          model: User,
          attributes: ['username'],
        }]
        order: [['date_created', 'ASC']],
      });
  
      const pastBlogs = blogData.map((blogs) => blogs.get({ plain: true }));
  
      res.render('homepage', {
        users,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
router.get('/login', (req, res) => {
// If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});
  
module.exports = router;
  