# bank-scraper-api

[![Build Status](https://travis-ci.org/samucars/bank-scraper-api.svg?branch=master)](https://travis-ci.org/samucars/bank-scraper-api)
[![Coverage Status](https://coveralls.io/repos/github/samucars/bank-scraper-api/badge.svg)](https://coveralls.io/github/samucars/bank-scraper-api)

API for collecting bank data using the library [puppeteer](https://github.com/GoogleChrome/puppeteer)

> *WARNING*: Your account can be blocked if you error your password

The scraper sets a few seconds of waiting between navigations of the pages this can cause errors in the API return if your internet connection is not good.

## Dependencies

* [Node.js](https://nodejs.org)

## Build Setup

``` bash
# install dependencies
npm install

# env port express (default 3000)
export PORT=3000

# start server
npm start
```

# Testing
``` bash
# run unit tests
npm test
```

# APIs

For now supports only itau

*1. POST /itau*

```javascript
body:
{
  branch: '',
  bankaccount: '',
  password: ''
}

```
The average response time is 45 seconds

## Future resources

* Create integration tests
* Integration with other banks
* Performance improvement
