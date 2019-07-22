module.exports = async (req, res, next) => {
  try {
    req.logger.info('inserts bank data');

    await req.page.waitForSelector('#agencia');
    await req.page.type('#agencia', req.body.branch);

    await req.page.waitForSelector('#conta');
    await req.page.type('#conta', req.body.bankaccount);

    await req.page.waitFor(150);
    await req.page.click('#btnLoginSubmit');

    req.logger.info('wait for 20 seconds');
    // wait for page load and redirect
    await req.page.waitFor(20000);

    return next();
  } catch (error) {
    return next(error);
  }
};
