module.exports = async (req, res, next) => {
  try {
    req.logger.info('collect cards data');

    await req.page.waitForSelector('#accordionExibirBoxCartoes');
    await req.page.click('#accordionExibirBoxCartoes');
    await req.page.waitFor(2000);

    const selector = '#exibirBoxCartoes .conteudo table tr td';
    const cards = await req.page.$$eval(selector, elements => elements.map(e => e.innerText));

    req.cards = cards;

    return next();
  } catch (error) {
    return next(error);
  }
};
