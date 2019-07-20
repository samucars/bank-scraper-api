module.exports = async (req, res, next) => {
  try {
    req.logger.info('collect bankstatement');

    const {
      balance, cards, credit, overdraft
    } = req;

    const columnDates = await req.page.evaluate(
      () => Array
        .from(document.querySelectorAll('#corpoTabela-gridLancamentos-pessoa-fisica tr .element--accessHide')) // eslint-disable-line no-undef
        .map(e => e.innerText),
    );

    const accountingEntries = await req.page.evaluate(
      () => Array
        .from(document.querySelectorAll('#corpoTabela-gridLancamentos-pessoa-fisica tr')) // eslint-disable-line no-undef
        .map((elem) => {
          const childrens = Array.from(elem.children).map(children => children.innerText);
          childrens.shift();
          childrens.pop();
          return childrens;
        }),
    );

    const bankstatement = accountingEntries
      .map((elem, index) => { elem.unshift(columnDates[index]); return elem; });

    await req.browser.close();

    return res.json({
      balance,
      cards,
      credit,
      overdraft,
      bankstatement,
    });
  } catch (error) {
    return next(error);
  }
};
