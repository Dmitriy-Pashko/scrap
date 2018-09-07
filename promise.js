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
                        page.$('.more-btn a:not([style*="display: none"])')
                            .then((result) => {
                                if(result !== null) {
                                    page.waitForSelector('.more-btn')
                                        .then(() => page.waitFor(1000))
                                        .then(() => page.click('.more-btn > a'))
                                        .then(more);
                                }
                                else {
                                    return console.log("No more buttons!");
                                }
                            })
                    }
                    return more();
                })
        })

        // browser.close();
}

scrape();