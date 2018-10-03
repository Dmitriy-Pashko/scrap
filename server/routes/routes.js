const express = require('express');
const jwt = require('jsonwebtoken');
const Jobs = require('../model/dbmodel');
const Users = require('../model/users');
const secret = require('../config/secrets');

const router = express.Router();
const { secretKey } = secret;

const sendError = res => e => res.status(500).send(e);

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.json({ success: false, msg: 'Please login to have access to this action' });
  }
};

router.post('/authentication/register', (req, res) => {
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

router.post('/authentication/login', (req, res) => {
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

router.get('/users/all', (req, res) => {
  Users.find()
    .exec()
    .then(users => res.json(users))
    .catch(sendError(res));
});

router.put('/users/:user_id', verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    console.log(req.params.user_id);
    if (err) {
      res.sendStatus(403);
    } else {
      Users.findByIdAndUpdate(req.params.user_id, req.body, { new: true })
        .exec()
        .then(user => res.json({ user, authData }))
        .catch(sendError(res));
    }
  });
});

router.delete('/users/:user_id', verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Users.deleteOne({ _id: req.params.user_id })
        .then(() => res.json({ message: 'user removed succesfully', authData }))
        .catch(sendError(res));
    }
  });
});

router.get('/jobs/:page', (req, res) => {
  const perPage = 10;
  const page = req.params.page || 1;

  Jobs.find()
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec()
    .then(jobs => res.json(jobs))
    .catch(sendError(res));
});

router.post('/jobs', verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const newJob = new Jobs(req.body);
      newJob.save()
        .then(job => res.json({ job, authData }))
        .catch(sendError(res));
    }
  });
});


router.delete('/jobs/:job_id', verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Jobs.deleteOne({ _id: req.params.job_id })
        .then(() => res.json({ message: 'job removed succesfully', authData }))
        .catch(sendError(res));
    }
  });
});

router.put('/jobs/:job_id', verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Jobs.findByIdAndUpdate(req.params.job_id, req.body, { new: true })
        .exec()
        .then(job => res.json({ job, authData }))
        .catch(sendError(res));
    }
  });
});

module.exports = router;
