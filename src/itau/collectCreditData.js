module.exports = async (req, res, next) => {
  try {
    req.logger.info('collect credit data');

    await req.page.click('#accordionExibirBoxCredito');
    await req.page.waitFor(2000);

    const selector = '#exibirBoxCredito .conteudo table tr td';
    const credit = await req.page.$$eval(selector, elements => elements.map(e => e.innerText));

    req.credit = credit;

    return next();
  } catch (error) {
    return next(error);
  }
};
