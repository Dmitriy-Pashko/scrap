const express = require('express');
const jwt = require('jsonwebtoken');
const Users = require('../model/users');
const secret = require('../config/secrets');

const router = express.Router();
const { secretKey } = secret;

router.post('/register', (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.json({ success: false, msg: 'Please fill all of the fields' });
  } else {
    Users.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
        res.json({ success: false, err });
      } else if (user) {
        res.json({ success: false, msg: 'Username is already exists' });
      } else {
        const newUser = new Users({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });
        newUser.save(() => {
          res.json({ success: true, msg: 'Successful created new user.', newUser });
        });
      }
    });
  }
});

router.post('/login', (req, res) => {
  Users.findOne({
    username: req.body.username,
  }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else if (user.password === req.body.password) {
      // check if password matches
      const token = jwt.sign(user.toJSON(), secretKey);
      // res.send(user);
      res.json({ token });
    } else {
      res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
    }
  });
});

module.exports = router;
