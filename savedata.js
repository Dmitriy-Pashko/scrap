var mongoose = require('mongoose');
var jobs = require('./server/model/dbmodel');

mongoose.connect('mongodb://god:blessrng1@ds139992.mlab.com:39992/scrapy', { useNewUrlParser: true });

let saveJobs = (jobsArray) => {
    return new Promise((resolve, reject) => {
        let arr = jobsArray.forEach((dou) => {
            let job = new jobs({
                link: dou.link,
                title: dou.title,
                description: dou.desc,
            });
            job.save(function(err) {
                if (err)
                    return console.log(err);
                return console.log('Job successfully added!');
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