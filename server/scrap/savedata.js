const mongoose = require('mongoose');
const jobs = require('../model/dbmodel');
const Promise = require('bluebird');

mongoose.connect('mongodb://god:blessrng1@ds139992.mlab.com:39992/scrapy', { useNewUrlParser: true });

let saveJobs = (jobsArray) => {
        let arr = Promise.each(jobsArray, function(dou){
            // here is repetble job exclusion
            let duplicate = jobs.find({ link: dou.link});

            if(duplicate) {
                return;
            } else {
                job = new jobs({
                    link: dou.link,
                    title: dou.title,
                    description: dou.desc,
                    category: dou.category
                });
                job.save(function(err) {
                    if (err)
                        return console.log(err);
                    return true;
                });
                console.log(job);
                return job;
            }

        });
        if(arr){
            return arr;
        } else {
            return true;
        }
}

module.exports = saveJobs;