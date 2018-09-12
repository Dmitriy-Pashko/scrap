var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jobs = require('./server/model/dbmodel');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;
mongoose.connect('mongodb://god:blessrng1@ds139992.mlab.com:39992/scrapy', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
});

// scrape().then((value) => {
//     console.log("Database stage"); // Success!
//     value.arr.forEach(function(dou){
//             let job = new jobs({
//                 link: dou.link,
//                 title: dou.title,
//                 description: dou.desc,
//             });
//             job.save(function(err) {
//                 if (err)
//                     return console.log(err);
//                 console.log('Job successfully added!');
//             });
//     })
// });

// app.use('/api', router);

// app.listen(port, function() {
//     console.log('derr');
// });