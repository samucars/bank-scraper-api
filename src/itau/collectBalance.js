module.exports = async (req, res, next) => {
  try {
    req.logger.info('collect balance');

    await req.page.click('#VerExtrato');
    await req.page.waitFor(5000);

    const balance = await req.page.$eval('.valor-saldo-pf', element => element.innerText);
    const overdraftAvailable = await req.page.$eval('.texto-valor-subcoluna-pf', element => element.innerText);
    const overdraftProtection = await req.page.$eval('.valor-subcoluna-pf', element => element.innerText);

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
