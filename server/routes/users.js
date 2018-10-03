const express = require('express');
const jwt = require('jsonwebtoken');
const Users = require('../model/users');
const secret = require('../config/secrets');
const outerFunc = require('./usefulFunc');

const router = express.Router();
const { secretKey } = secret;
const { sendError, verifyToken } = outerFunc;

router.get('/all', (req, res) => {
  Users.find()
    .exec()
    .then(users => res.json(users))
    .catch(sendError(res));
});

router.put('/:user_id', verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
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

router.delete('/:user_id', verifyToken, (req, res) => {
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

module.exports = router;
