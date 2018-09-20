const express = require('express');
const jobs = require('../model/dbmodel');

const router = express.Router();

function sendError(res) {
  return function (e) {
    return res.status(500).send(e);
  };
}

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


router.delete('/jobs/:job_id', function (req, res) {
    jobs.remove({ _id: req.params.job_id })
    .then(() => {
      return res.json({ message: 'job removed succesfully' });
    })
    .catch(sendError(res));
});

router.put('/jobs/:job_id', function (req, res) {
    jobs.findByIdAndUpdate(req.params.job_id, req.body, { new: true })
    .exec()
    .then((job) => {
      return res.send(job);
    })
    .catch(sendError(res));
});

module.exports = router;