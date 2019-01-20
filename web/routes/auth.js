const router = require('express').Router();

const validator = require('../joivalidator');
const schemas = require('../schemas/auth');

const redirectIfLoggedIn = (req,res,next) => {
  if(req.session.user && req.cookies.user_sid) {
    return res.redirect('/user');
  }
  return next();
}

router.get(
  '/',
  redirectIfLoggedIn,
  (req,res)=>{
    res.render('index');
});

router.post(
  '/login',
  redirectIfLoggedIn,
  validator(schemas.loginSchema),
  (req,res)=>{
    if(req.body.username == process.env.USERNAME && req.body.password == process.env.PASSWORD) {
      req.session.user = true
      req.session.save(err=>{
        if(err) return res.sendError(err);
        return res.sendSuccess();
      })
    } else {
      return res.sendError(null,'Invalid Credentials');
    }
});

router.get(
  '/logout',
  (req,res)=>{
    if(req.session.user && req.cookies.user_sid) {
      res.clearCookie('user_sid');
      req.session.destroy();
    }
    res.redirect('/');
  }
)

module.exports = router;