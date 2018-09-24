// file for auto loading tasks
// import scrape from './scrap/scraping'
let scrape = require('./scrap/scraping');

const CronJobManager = require('cron-job-manager'),
    manager = new CronJobManager( 
    'scrapping from dou.ua',
    '0 10 * * * *', 
    () => scrape(),
    {
      start:true,
    } 
    );