const User = require('../models/User');
const jwt = require('jsonwebtoken');


//handle  different Error messages
const handleErrors = err => {
 let errors = { email: '', password: '' };

 // incorrect mail
 if (err.message == 'incorrect email') {
  errors.email = "This email is not registered";
  return errors;
 }

 // password mail
 if (err.message == 'incorrect password') {
  errors.password = "This password is incorrect!";
  return errors;
 }

 //duplicate error code
 if (err.code === 11000) {
  errors.email = "This email is already registered";
  return errors;
 }
 //validation errors
 if (err.message.includes('user validation failed')) {
  Object.values(err.errors).forEach(({ properties }) => {
   errors[properties.path] = properties.message;
   //console.log(properties)
  });
 }
 return errors;
}


// jwt 
const maxAge = 3 * 24 * 60 * 60;

const createToken = id => {
 return jwt.sign({ id }, "brenda secret", { expiresIn: maxAge })
}



module.exports.signup_get = (req, res) => {
 res.render('signup');
}


module.exports.login_get = (req, res) => {
 res.render('login');
}


module.exports.signup_post = async (req, res) => {
 const { email, password } = req.body;
 try {
  const user = await User.create({ email, password });
  const token = createToken(user._id);
  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
  res.status(201).json({ user: user._id });
 } catch (err) {
  //output useful error info
  let errors = handleErrors(err);
  res.status(400).json({ errors });

 }
}


module.exports.login_post = async (req, res) => {
 const { email, password } = req.body;
 try {
  const user = await User.login(email, password);
  //after user login successful, create jwt token to browser 
  const token = createToken(user._id);
  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
  res.status(201).json({ user: user._id });
 }
 catch (err) {
  //output useful error info
  let errors = handleErrors(err);
  res.status(400).json({ errors });
 }
}

module.exports.logout_get = (req, res) => {
 res.cookie('jwt', '', { maxAge: 1 });
 res.redirect('/');
}