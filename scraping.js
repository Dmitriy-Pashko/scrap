const puppeteer = require('puppeteer');
const saveData = require('./savedata');

let mycounter = 1;
let scrape = () => puppeteer.launch({headless: false})
    .then((browser) => browser.newPage()
        .then((page) => page.goto('https://jobs.dou.ua/')
            .then(() => {
                let chooseCategory = () => page.waitFor(1000)
                    .then(() => page.waitForSelector('select'))
                    .then(() => page.click('select'))
                    .then(() => page.waitFor(4000))
                    .then(() => page.evaluate((counter) => {
                        let last = document.querySelector('option:last-child').text;
                        let selectedOption = document.querySelector('option[selected]').text;

                        if(last != selectedOption){
                            let select = document.querySelector('select');
                            select.selectedIndex = counter;
                            counter++;
                            select.parentNode.submit();
                            return {
                                counter
                            }
                        } else {
                            return null;
                        }
                    }, mycounter))
                    .then((counter) => {
                        mycounter = counter;
                        console.log(counter);
                        if (counter) {
                            return chooseCategory()
                        } else {
                            return true;
                        }
                    })
                        
                return chooseCategory();
            })
        ).then(() => browser.close())
    ).catch((err) => console.log(err));
scrape();