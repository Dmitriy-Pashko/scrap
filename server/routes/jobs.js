const express = require('express');
const jwt = require('jsonwebtoken');
const Jobs = require('../model/dbmodel');
const secret = require('../config/secrets');
const outerFunc = require('./usefulFunc');

const router = express.Router();
const { secretKey } = secret;
const { sendError, verifyToken } = outerFunc;

router.get('/:page', (req, res) => {
  const perPage = 10;
  const page = req.params.page || 1;

  Jobs.find()
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec()
    .then(jobs => res.json(jobs))
    .catch(sendError(res));
});

router.post('/', verifyToken, (req, res) => {
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


router.delete('/:job_id', verifyToken, (req, res) => {
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

router.put('/:job_id', verifyToken, (req, res) => {
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
