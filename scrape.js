var express = require('express');
var mongoose = require('mongoose');
var jobs = require('./server/model/dbmodel');
var bodyParser = require('body-parser');
const puppeteer = require('puppeteer');

// var app = express();
// var router = express.Router();

// var port = process.env.API_PORT || 3001;
// mongoose.connect('mongodb://god:blessrng1@ds139992.mlab.com:39992/scrapy', { useNewUrlParser: true });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//     next();
// });

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://jobs.dou.ua/vacancies/?category=Front+End');

    // Scrape
    const result = await page.evaluate(() => {
        let arr = [];

        let more = async () => {
            await page.waitForSelector('.more-btn');
            await page.click('.more-btn > a');
            await page.waitFor(1000);
            await page.once('load', () => console.log('Page loaded!'));

            if (document.querySelector('.more-btn a:not([style*="display: none"])') !== nill) {
                return more();
            } else {

                let elements = document.querySelectorAll('.vacancy');

                elements.forEach((elem)=>{
                    let link = elem.childNodes[1].children[0].href;
                    let title = elem.childNodes[1].children[0].innerText;
                    let desc = elem.childNodes[3].innerText;

                    arr.push({link, title, desc});
                })
            }
        };

        more();

        return {
            arr,
        }

    });

    browser.close();
    return result;
};

scrape().then((value) => {
    console.log("Database stage"); // Success!
    value.arr.forEach(function(dou){
            let job = new jobs({
                link: dou.link,
                title: dou.title,
                description: dou.desc,
            });
            job.save(function(err) {
                if (err)
                    return console.log(err);
                console.log('Job successfully added!');
            });
    })
});

// app.use('/api', router);

// app.listen(port, function() {
//     console.log('derr');
// });