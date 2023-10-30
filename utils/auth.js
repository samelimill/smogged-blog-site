const withAuth = (req, res, next) => {
  // TODO: Add a comment describing the functionality of this if statement
  // redirects to login screen if not logged in
  
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
