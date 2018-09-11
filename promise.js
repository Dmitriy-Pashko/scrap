const puppeteer = require('puppeteer');
const saveData = require('./savedata');

let scrape = () => {
    return puppeteer.launch({headless: false})
        .then((browser) => browser.newPage()
            .then((page) => {
                return page.goto('https://jobs.dou.ua/vacancies/?category=Front+End')
                    .then(() => {
                        let more = () => {
                            return page.waitFor(1000)
                                .then(() => page.waitForSelector('.more-btn'))
                                .then(() => page.$('.more-btn a:not([style*="display: none"])'))
                                .then((result) => {
                                    if(result !== null) {
                                        return page.click('.more-btn > a')
                                            .then(more);
                                    }
                                    else {
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
                                    }
                                })
                        }
                        return more().catch(err => console.log(err));
                    })              
            }).then(() => browser.close())
        )
}

scrape();