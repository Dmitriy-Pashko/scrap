// file for auto loading tasks
// import scrape from './scrap/scraping'
const CronJobManager = require('cron-job-manager');
const scrape = require('./scrap/scraping');

const manager = new CronJobManager(
  'scrapping from dou.ua',
  '0 10 * * * *',
  () => scrape(),
  {
    start: true,
  },
);
