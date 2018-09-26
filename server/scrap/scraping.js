const puppeteer = require('puppeteer');
const saveData = require('./savedata');

let mycounter = 1;

const countUp = page => page.evaluate((counter) => {
  const last = document.querySelector('option:last-child').text;
  const selectedOption = document.querySelector('option[selected]');
  const select = document.querySelector('select');
  let count = counter;

  if (selectedOption === null) {
    select.selectedIndex = counter;
    count += 1;
    return count;
  } else if (last !== selectedOption.text) {
    select.selectedIndex = count;
    count += 1;
    return count;
  }
  return null;
}, mycounter);

const more = page => page.waitFor(1000)
  .then(() => page.once('load', () => console.log('Page loaded!')))
  .then(() => page.$('.more-btn a:not([style*="display: none"])'))
  .then((result) => {
    if (result !== null) {
      return page.click('.more-btn > a')
        .then(() => more(page));
    }
    return page.evaluate(() => {
      const arr = [];
      const elements = document.querySelectorAll('.vacancy');
      const category = document.querySelector('option[selected]').text;

      elements.forEach((elem) => {
        const link = elem.childNodes[1].children[0].href;
        const title = elem.childNodes[1].children[0].innerText;
        const desc = elem.childNodes[3].innerText;

        arr.push({
          link,
          title,
          desc,
          category,
        });
      });
      return arr;
    }).then(arr => saveData(arr));
  });

const formSubmit = (page, counter) => {
  mycounter = counter;
  if (counter) {
    return page.evaluate(() => {
      const select = document.querySelector('select');
      select.parentNode.submit();
    })
      .then(() => more(page))
      .then(() => chooseCategory(page));
  }
  return true;
};

const chooseCategory = page => page.waitFor(1000)
  .then(() => page.waitForSelector('select'))
  .then(() => page.click('select'))
  .then(() => page.waitFor(4000))
  .then(() => countUp(page))
  .then(counter => formSubmit(page, counter));

const scrape = () => puppeteer.launch({ headless: false })
  .then(browser => browser.newPage()
    .then(page => page.goto('https://jobs.dou.ua')
      .then(() => chooseCategory(page)))
    .then(() => browser.close()))
  .catch(err => console.log(err));
// scrape();
module.exports = scrape;
