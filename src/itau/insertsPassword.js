module.exports = async (req, res, next) => {
  try {
    req.logger.info('inserts password');

    await req.page.waitForSelector('.teclas');

    const passwordNumbers = req.body.password.split('').map(Number);
    const searchPasswordButtons = () => Array.from(document.querySelectorAll('.tecla')).map(e => e.text); // eslint-disable-line no-undef
    const buttons = await req.page.evaluate(searchPasswordButtons);
    // remove clean button
    buttons.pop();
    const combinations = buttons.map(e => e.trim().split('ou').map(Number));
    const clickSequence = passwordNumbers
      .map(number => combinations.find(([start, end]) => number === start || number === end));

    /* eslint-disable no-restricted-syntax, no-await-in-loop */
    // the loop needs to be sequential
    for (const [start, end] of clickSequence) {
      await req.page.click(`[aria-label="${start} ou ${end}"]`);
    }

    await req.page.click('#acessar');
    // wait for page load
    await req.page.waitFor(8000);

    return next();
  } catch (error) {
    return next(error);
  }
};
