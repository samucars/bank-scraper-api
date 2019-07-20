module.exports = async (req, res, next) => {
  try {
    req.logger.info('collect credit data');

    await req.page.click('#accordionExibirBoxCredito');
    await req.page.waitFor(2000);

    const credit = await req.page.evaluate(
      () => Array
        .from(document.querySelectorAll('#exibirBoxCredito .conteudo table tr td')) // eslint-disable-line no-undef
        .map(e => e.innerText)
    );

    req.credit = credit;

    return next();
  } catch (error) {
    return next(error);
  }
};
