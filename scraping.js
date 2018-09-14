const puppeteer = require('puppeteer');
const saveData = require('./savedata');

let i = 1;
let scrape = () => puppeteer.launch({headless: false})
    .then((browser) => browser.newPage()
        .then((page) => page.goto('https://jobs.dou.ua/')
            .then(() => {
                let chooseCategory = () => page.waitFor(1000)
                    .then(() => page.waitForSelector('select'))
                    .then(() => page.click('select'))
                    .tnen(() => page.evaluate(() => {
                        let last = document.querySelector('option:last-child');
                        let selectedOption = document.querySelector('option[selected]');

                        if(last != selectedOption){
                            let select = document.querySelector('selected');
                            select.selectedIndex = i;
                            i++;
                            console.log(selectedOption);
                            return chooseCategory;
                        } else {
                            return true;
                        }
                    }))
                return chooseCategory()
            })
        ).then(() => browser.close())
    )
scrape();