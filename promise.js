const puppeteer = require('puppeteer');
const saveData = require('./server/scrap/savedata');

const scrape = () => puppeteer.launch({ headless: false })
  .then(browser => browser.newPage()
    .then(page => page.goto('https://jobs.dou.ua/vacancies/?category=Front+End')
      .then(() => {
        const more = () => page.waitFor(1000)
          .then(() => page.waitForSelector('.more-btn'))
          .then(() => page.$('.more-btn a:not([style*="display: none"])'))
          .then((result) => {
            if (result !== null) {
              return page.click('.more-btn > a')
                .then(more);
            }
            return page.evaluate(() => {
              const arr = [];
              const elements = document.querySelectorAll('.vacancy');

              elements.forEach((elem) => {
                const link = elem.childNodes[1].children[0].href;
                const title = elem.childNodes[1].children[0].innerText;
                const desc = elem.childNodes[3].innerText;

                arr.push({ link, title, desc });
              });
              return arr;
            }).then(arr => saveData(arr));
          });
        return more().catch(err => console.log(err));
      }))
    .then(() => browser.close()));

scrape();
