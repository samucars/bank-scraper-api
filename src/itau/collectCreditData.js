module.exports = async (req, res, next) => {
  try {
    req.logger.info('collect credit data');

    await req.page.click('#accordionExibirBoxCredito');
    await req.page.waitFor(3000);

    const selector = '#exibirBoxCredito .conteudo table tr';
    const credits = await req.page.$$eval(
      selector,
      elements => elements
        .map(credit => Array.from(credit.children).map(children => children.innerText))
        .map(credit => ({
          name: credit[0].split('\n\n')[0],
          preApprovedValue: credit[1]
        }))
    );
    req.credits = credits;
    // remove titles
    req.credits.shift();
    return next();
  } catch (error) {
    return next(error);
  }
};
