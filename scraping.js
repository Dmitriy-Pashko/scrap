const puppeteer = require('puppeteer');
const saveData = require('./savedata');

let mycounter = 1;
let scrape = () => puppeteer.launch({headless: false})
    .then((browser) => browser.newPage()
        .then((page) => page.goto('https://jobs.dou.ua')
            .then(() => {
                let chooseCategory = () => page.waitFor(1000)
                    .then(() => page.waitForSelector('select'))
                    .then(() => page.click('select'))
                    .then(() => page.waitFor(4000))
                    .then(() => page.evaluate((counter) => {

                        let last = document.querySelector('option:last-child').text;
                        let selectedOption = document.querySelector('option[selected]');
                        let select = document.querySelector('select');

                        if (selectedOption === null) {
                            select.selectedIndex = counter;
                            counter++;
                            return {
                                counter
                            }
                        } else if (last != selectedOption.text) {
                            select.selectedIndex = counter;
                            counter++;
                            return {
                                counter
                            }
                        } else {
                            return counter=4;
                        }
                        
                    }, mycounter))
                    .then((counter) => {
                        mycounter = counter;
                        console.log(counter);
                        if (counter) {
                            return page.evaluate(()=>{
                                let select = document.querySelector('select');
                                select.parentNode.submit();
                            }).then(() => chooseCategory());
                        } else {
                            return true;
                        }
                    })
                        
                return chooseCategory();
            })
        ).then(() => browser.close())
    ).catch((err) => console.log(err));
scrape();