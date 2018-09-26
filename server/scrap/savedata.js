const mongoose = require('mongoose');
const Promise = require('bluebird');
const Jobs = require('../model/dbmodel');


mongoose.connect('mongodb://god:blessrng1@ds139992.mlab.com:39992/scrapy', { useNewUrlParser: true });

const saveJobs = (jobsArray) => {
  const arr = Promise.each(jobsArray, (dou) => {
    // here is repetble job exclusion
    const duplicate = Jobs.find({ link: dou.link });

    if (duplicate) {
      return true;
    }
    const job = new Jobs({
      link: dou.link,
      title: dou.title,
      description: dou.desc,
      category: dou.category,
    });
    job.save((err) => {
      if (err) {
        // return console.log(err);
        return err;
      }
      return true;
    });
    // console.log(job);
    return job;
  });

  if (arr) {
    return arr;
  }
  return true;
};

module.exports = saveJobs;
