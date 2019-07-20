module.exports = async (req, res, next) => {
  try {
    req.logger.info('collect balance');

    await req.page.click('#VerExtrato');
    await req.page.waitFor(2000);

    /* eslint-disable no-undef */
    const balance = await req.page.evaluate(() => document.querySelector('.valor-saldo-pf').innerText);
    const overdraftAvailable = await req.page.evaluate(() => document.querySelector('.texto-valor-subcoluna-pf').innerText);
    const overdraftProtection = await req.page.evaluate(() => document.querySelector('.valor-subcoluna-pf').innerText);

    req.balance = balance;
    req.overdraft = {
      available: overdraftAvailable,
      protection: overdraftProtection,
    };

    return next();
  } catch (error) {
    return next(error);
  }
};
