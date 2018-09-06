const puppeteer = require('puppeteer');
var mongoose = require('mongoose');
var jobs = require('./server/model/dbmodel');

mongoose.connect('mongodb://god:blessrng1@ds139992.mlab.com:39992/scrapy', { useNewUrlParser: true });

function run (pagesToScrape) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!pagesToScrape) {
                pagesToScrape = 1;
            }
            
            pagesToScrape = 2;
            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage();
            await page.goto('https://jobs.dou.ua/vacancies/?category=Front+End');
            
            //nonsense try for getting jobs count
            // let cities = document.querySelectorAll('ul.other > li > em');
            let currentPage = 1;
            let urls = [];
            while (currentPage <= pagesToScrape) {
                let newUrls = await page.evaluate(() => {
                    let results = [];
                    let items = document.querySelectorAll('.vacancy');

                    items.forEach((item) => {

                        let link = item.childNodes[1].children[0].href;
                        let title = item.childNodes[1].children[0].innerText;
                        let desc = item.childNodes[3].innerText;

                        results.push({
                            link,
                            title,
                            desc
                        });
                    });
                    return results;
                });
                urls = urls.concat(newUrls);
                if (currentPage < pagesToScrape) {
                    await Promise.all([
                        await page.click('.more-btn > a'),
                        await page.waitForSelector('.more-btn'),
                        await page.waitFor(1000),
                        await page.once('load', () => console.log('Page loaded!'))
                    ])
                }
                currentPage++;
            }
            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}

// run(3).then(console.log).catch(console.error);
run().then((value)=>{
    console.log(value); // Success!
    value.forEach(function(dou){
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
}).catch(console.error);