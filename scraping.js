const puppeteer = require('puppeteer');
const saveData = require('./savedata');

let mycounter = 1;
let chooseCategory = (page) => page.waitFor(1000)
    .then(() => page.waitForSelector('select'))
    .then(() => page.click('select'))
    .then(() => page.waitFor(4000))
    .then(() => page.evaluate((counter) => {

        let last = document.querySelector('option:last-child');
        let selectedOption = document.querySelector('option[selected]');
        let select = document.querySelector('select');

        if (last != selectedOption) {
            select.selectedIndex = counter;
            counter++;
            return counter;
        }  else {
            return null;
        }
        
    }, mycounter))
    .then((counter) => {
        mycounter = counter;
        if (counter) {
            return page.evaluate(()=>{
                let select = document.querySelector('select');
                select.parentNode.submit();
            }).then(() => chooseCategory(page));
        } else {
            return true;
        }
    });
    
    let scrape = () => puppeteer.launch({headless: false})
    .then((browser) => browser.newPage()
        .then((page) => page.goto('https://jobs.dou.ua')
            .then(() => chooseCategory())
        ).then(() => browser.close())
    ).catch((err) => console.log(err));
scrape();