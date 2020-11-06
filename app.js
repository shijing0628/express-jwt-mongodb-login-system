const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/autheRoutes');
const cookieParser = require('cookie-parser');
const app = express();
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection -> open port 3000
const dbURI = 'mongodb+srv://root:Password@cluster0.rxgaf.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
//apply to all routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

//login and sign up routes
app.use(authRoutes);

// cookies
app.get('/set-cookies', (req, res) => {
  //res.setHeader('Set-Cookie', 'newUser-true');
  res.cookie('newUser', false);
  res.cookie("employee", true)
  res.send('you got cookies!')
})

app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies;
  res.json(cookies);
})