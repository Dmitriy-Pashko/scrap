const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://jobs.dou.ua/vacancies/?category=Front+End');

    // Scrape
    const result = await page.evaluate(() => {
        let arr = [];

        let more = async () => {
            await page.waitForSelector('.more-btn');
            await page.click('.more-btn > a');
            await page.waitFor(1000);
            await page.once('load', () => console.log('Page loaded!'));

            if (document.querySelector('.more-btn a:not([style*="display: none"])') !== null) {
                return more();
            } else {

                let elements = document.querySelectorAll('.vacancy');

                elements.forEach((elem)=>{
                    let link = elem.childNodes[1].children[0].href;
                    let title = elem.childNodes[1].children[0].innerText;
                    let desc = elem.childNodes[3].innerText;

                    arr.push({link, title, desc});
                })
            }
        };

        return {
            arr,
            more()
        }

    });

    browser.close();
    return result;
};

scrape().then(console.log("Database stage"));