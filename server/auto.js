// file for auto loading tasks
// import scrape from './scrap/scraping'
let scrape = require('./scrap/scraping');

const CronJobManager = require('cron-job-manager'),
    manager = new CronJobManager( 
    'scrapping from dou.ua',
    '0 0 11 * * *', 
    () => scrape(),
    {
      start:true,
    } 
    );