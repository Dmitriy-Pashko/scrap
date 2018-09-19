const puppeteer = require('puppeteer');
const saveData = require('./savedata');

let mycounter = 1;

let countUp = (page) => page.evaluate((counter) => {
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
}, mycounter)

let more = (page) => page.waitFor(1000)
    .then(() => page.once('load', () => console.log('Page loaded!')))
    .then(() => page.$('.more-btn a:not([style*="display: none"])'))
    .then((result) => {
        if(result !== null) {
            return page.click('.more-btn > a')
                .then(more(page));
        }
        return page.evaluate(()=>{
            let arr = [];
            let elements = document.querySelectorAll('.vacancy');

            elements.forEach((elem)=>{
                let link = elem.childNodes[1].children[0].href;
                let title = elem.childNodes[1].children[0].innerText;
                let desc = elem.childNodes[3].innerText;

                arr.push({link, title, desc});
            })
            return arr;
        }).then((arr) => saveData(arr));
    })

let formSubmit = (page, counter) => {
    mycounter = counter;
    if (counter) {
        return page.evaluate(()=>{
            let select = document.querySelector('select');
            select.parentNode.submit();
        })
        .then(() => more(page))
        .then(() => chooseCategory(page));
    } else {
        return true;
    }
}

let chooseCategory = (page) => page.waitFor(1000)
    .then(() => page.waitForSelector('select'))
    .then(() => page.click('select'))
    .then(() => page.waitFor(4000))
    .then(() => countUp(page))
    .then((counter) => formSubmit(page,counter));
    
let scrape = () => puppeteer.launch({headless: false})
    .then((browser) => browser.newPage()
        .then((page) => page.goto('https://jobs.dou.ua')
            .then(() => chooseCategory(page))
        ).then(() => browser.close())
    ).catch((err) => console.log(err));
scrape();