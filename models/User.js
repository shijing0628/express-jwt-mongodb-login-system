const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
 email: {
  type: String,
  required: [true, "please enter an email"],
  unique: true,
  lowercase: true,
  //validate: [{ validator: value => isEmail(value), msg: 'Invalid email.' }]
  validate: [isEmail, "please enter a valid email!"]
 },
 password: {
  type: String,
  required: [true, "please enter a password"],
  minlength: [6, "Minium password length is 6 characters."]
 }
});

//fire a function after doc save to db
// userSchema.post('save', (doc, next) => {
//  console.log("new user was saved", doc);
//  next();
// });


//fire a function before doc save to db , we cannot use arrow function because this will be undefined.
userSchema.pre('save', async function (next) {
 let user = this;
 let salt = await bcrypt.genSalt();
 user.password = await bcrypt.hash(this.password, salt);
 next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
 const user = await this.findOne({ email });
 if (user) {
  const auth = await bcrypt.compare(password, user.password);
  if (auth) {
   return user;
  }
  throw Error('incorrect password');
 }
 throw Error('incorrect email');
}


const User = mongoose.model('user', userSchema);
module.exports = User;