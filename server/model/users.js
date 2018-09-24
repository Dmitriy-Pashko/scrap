const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// UserSchema.methods.comparePassword = function (passw, cb) {
//   bcrypt.compare(passw, this.password, function (err, isMatch) {
//     if (err) {
//       return cb(err);
//     }
//     cb(null, isMatch);
//     return cb;
//   });
// };


module.exports = mongoose.model('users', UserSchema, 'users');