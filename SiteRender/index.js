const scrape = require('website-scraper');
const rimraf = require('rimraf');

module.exports = async function (context, myTimer) {
    
    var siteUrls = process.env["SiteURLs"].split(";");
    context.log('Download site(s) URLs ', siteUrls);

    var dirPath = '/temp';

    // website-scraper requires the output directory does not exist
    rimraf.sync(dirPath);

    const options = {
        urls: siteUrls,
        directory: dirPath,
        ignoreErrors: true,
        request: {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Azure Function) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'
            }
        }
    };
    
    var hrstart = process.hrtime();
    const result = await scrape(options);
    hrend = process.hrtime(hrstart);

    context.log('Download site(s) time: %ds %dms', hrend[0], hrend[1] / 1000000)
};