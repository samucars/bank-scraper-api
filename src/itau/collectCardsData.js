module.exports = async (req, res, next) => {
  try {
    req.logger.info('collect cards data');

    await req.page.click('#accordionExibirBoxCartoes');
    await req.page.waitFor(3000);

    const selector = '#exibirBoxCartoes .conteudo table tr';
    const cards = await req.page.$$eval(
      selector,
      elements => elements
        .map(card => Array.from(card.children).map(children => children.innerText))
        .map(card => ({
          name: card[0].replace('\n\n', ' / '),
          dueDate: card[1],
          value: card[2],
        }))
    );
    req.cards = cards;
    // remove titles
    req.cards.shift();
    return next();
  } catch (error) {
    return next(error);
  }
};
