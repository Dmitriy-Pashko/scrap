const puppeteer = require('puppeteer');

let scrape = () => {
    let browser = puppeteer.launch({headless: false})
        .then((browser) => {
            let page = browser.newPage();
            return page;
        })
        .then((page) => {
            page.goto('https://jobs.dou.ua/vacancies/?category=Front+End');
            return page;
        })
        .then((page) => {
            page.waitFor(1000);
            return page;
        })
        .then((page) => {
            let result = page.evaluate(() => {
                let more = () => {
                    page.waitForSelector('.more-btn')
                        .then((page) => {
                            page.click('.more-btn > a');
                        })
                }
            });
            return result; 
        })


        // browser.close();
}

scrape();