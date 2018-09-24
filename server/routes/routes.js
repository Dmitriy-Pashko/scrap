const express = require('express');
const jobs = require('../model/dbmodel');
const users = require('../model/users');
const jwt = require('jsonwebtoken');

const router = express.Router();

function sendError(res) {
  return function (e) {
    return res.status(500).send(e);
  };
}

let verifyToken = (req, res, next) => {
  const bearerHeader  = req.headers['authorization'];
  if (typeof bearerHeader  !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.json({ success: false, msg: 'Please login to have access to this action' });
  }
}

router.post('/register', (req,res) => {
  
  users.findOne({ username: req.body.username }, (err,user) => {
    if (err) throw err;

    if (!req.body.username || !req.body.password || !req.body.email) {
      res.json({ success: false, msg: 'Please fill all of the fields' });
    } else if (user) {
      res.json({ success: false, msg: 'Username is already exists' });
    } else {
      let newUser = new users({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      newUser.save(function (err) {
        res.json({ success: true, msg: 'Successful created new user.' });
      });
    }
  });

});

router.post('/login', (req, res) => {
  users.findOne({
    username: req.body.username,
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else if (user.password === req.body.password) {
      // check if password matches
      let token = jwt.sign(user.toJSON(), 'nodeauthsecret');
      // res.send(user);
      res.json({ token });
    } else {
      res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
    }
  });
})

router.get('/jobs/:page', function (req, res) {

    let perPage = 10
    let page = req.params.page || 1

    jobs.find()
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec()
        .then((jobs) => {
        return res.json(jobs);
        })
        .catch(sendError(res));
});


router.delete('/jobs/:job_id', verifyToken, function (req, res) {
  jwt.verify(req.token, 'nodeauthsecret', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      jobs.deleteOne({ _id: req.params.job_id })
      .then(() => {
        return res.json({ message: 'job removed succesfully', authData });
      })
      .catch(sendError(res));
    }
  });
});

router.put('/jobs/:job_id', verifyToken, function (req, res) {
  jwt.verify(req.token, 'nodeauthsecret', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      jobs.findOneAndUpdate(req.params.job_id, req.body, { new: true })
      .exec()
      .then((job) => {
        return res.json({ job , authData });
      })
      .catch(sendError(res));
    }
  });
});

module.exports = router;