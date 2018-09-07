const puppeteer = require('puppeteer');

let scrape = () => {
    puppeteer.launch({headless: false})
        .then((browser) => {
            return browser.newPage();
        })
        .then((page) => {
           return page.goto('https://jobs.dou.ua/vacancies/?category=Front+End')
                .then(() => {
                    let more = () => {
                        if(page.$('.more-btn a:not([style*="display: none"])') !== null) {
                            page.waitForSelector('.more-btn')
                                .then(() => {
                                    return page.waitFor(1000);
                                })
                                .then(() => {
                                    return page.click('.more-btn > a');
                                })
                                .then(more);
                        }
                        else {
                            return console.log("No more buttons!");
                        }

                    }
                    return more();
                })
                // .then(() => {
                //     return page.waitForSelector('.more-btn');
                // })
                // .then(() => {
                //     return page.waitFor(1000);
                // })
                // .then(() => {
                //     return page.click('.more-btn > a');
                // })
        })

        // browser.close();
}

scrape();