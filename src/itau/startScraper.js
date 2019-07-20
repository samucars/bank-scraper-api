const puppeteer = require('puppeteer');

module.exports = async (req, res, next) => {
  try {
    req.logger.info('start scraper');

    const browser = await puppeteer.launch({ defaultViewport: { width: 1000, height: 800 } });
    const page = await browser.newPage();
    await page.goto('https://www.itau.com.br/');

    req.browser = browser;
    req.page = page;
    return next();
  } catch (error) {
    return next(error);
  }
};
