const router = require('express').Router();
const loginCheck = (req,res,next) => {
  if(req.session.user && req.cookies.user_sid) {
    return next();
  }
  return res.redirect('/');
}

const user = require('./user');
const auth = require('./auth');

/**
 * Bypassing login check in development mode
 */
if(process.env.NODE_ENV === 'development')
  router.use('/user',user);
else
  router.use('/user',loginCheck,user);
router.use('/',auth);

module.exports = router;