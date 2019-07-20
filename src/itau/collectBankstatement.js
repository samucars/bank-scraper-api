module.exports = async (req, res, next) => {
  try {
    req.logger.info('collect bankstatement');

    const {
      balance, cards, credit, overdraft, page
    } = req;

    const dateSelector = '#corpoTabela-gridLancamentos-pessoa-fisica tr .element--accessHide';
    const columnDates = await page.$$eval(dateSelector, elems => elems.map(e => e.innerText));

    const entriesSelector = '#corpoTabela-gridLancamentos-pessoa-fisica tr';
    const getChildrens = (elem) => {
      const childrens = Array.from(elem.children).map(children => children.innerText);
      childrens.shift();
      childrens.pop();
      return childrens;
    };
    const accountingEntries = await page.$$eval(entriesSelector, elems => elems.map(getChildrens));

    const bankstatement = accountingEntries
      .map((elem, index) => {
        elem.unshift(columnDates[index]);
        const [date, description, value] = elem;
        return { date, description, value };
      });

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
