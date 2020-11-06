const jwt = require('jsonwebtoken');
const User = require('../models/User');


const requireAuth = (req, res, next) => {
 const token = req.cookies.jwt;

 //check json web token exist and is verified
 if (token) {
  jwt.verify(token, 'brenda secret', (err, decodedToken) => {
   if (err) {
    res.redirect('/login');
    console.log(err.message);
   } else {
    console.log(decodedToken);
    next();
   }
  })
 } else {
  res.redirect('/login');
 }
}


//check current user
const checkUser = (req, res, next) => {
 const token = req.cookies.jwt;
 if (token) {
  jwt.verify(token, 'brenda secret', async (err, decodedToken) => {
   if (err) {
    next();
    res.locals.user = null;
   } else {
    let user = await User.findById(decodedToken.id);
    //inject this info to view
    res.locals.user = user;
    console.log(res.locals.user)
    next();
   }
  })
 } else {
  res.locals.user = null;
  next();

 }
}

module.exports = { requireAuth, checkUser };