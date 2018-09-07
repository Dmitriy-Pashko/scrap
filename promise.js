const puppeteer = require('puppeteer');

let scrape = () => {
    puppeteer.launch({headless: false})
        .then((browser) => browser.newPage()
            .then((page) => {
                page.goto('https://jobs.dou.ua/vacancies/?category=Front+End')
                    .then(() => {
                        let more = () => {
                            page.waitFor(1000)
                                .then(() => page.waitForSelector('.more-btn'))
                                .then(() => page.$('.more-btn a:not([style*="display: none"])'))
                                .then((result) => {
                                    if(result !== null) {
                                        page.click('.more-btn > a')
                                            .then(more);
                                    }
                                    else {
                                        page.evaluate(()=>{
                                            let arr = [];
                                            let elements = page.$$('.vacancy');
                    
                                            elements.forEach((elem)=>{
                                                let link = elem.childNodes[1].children[0].href;
                                                let title = elem.childNodes[1].children[0].innerText;
                                                let desc = elem.childNodes[3].innerText;
                    
                                                arr.push({link, title, desc});
                                            })
                                            return arr;
                                        }).then((arr) => console.log(arr.length))
                                    }
                                })
                        }
                        return more();
                    }).then(() => browser.close())    
            })
        )
}

scrape();