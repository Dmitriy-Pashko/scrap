const mongoose = require('mongoose');
const jobs = require('./server/model/dbmodel');
const promise = require('bluebird');

mongoose.connect('mongodb://god:blessrng1@ds139992.mlab.com:39992/scrapy', { useNewUrlParser: true });

let saveJobs = (jobsArray) => {
    return new Promise((resolve, reject) => {
        let arr = promise.each(jobsArray, function(dou){
            job = new jobs({
                link: dou.link,
                title: dou.title,
                description: dou.desc,
            });
            job.save(function(err) {
                return new Promise((resolve, reject) => {
                    if (err)
                        return reject(console.log(err));
                    return resolve(true);
                })
            });
        });
        if(arr){
            return resolve(arr);
        } else {
            return reject(true);
        }
    });
}

module.exports = saveJobs;