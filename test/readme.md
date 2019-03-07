# Tests

To run all the tests use `npm test`. This will run the tests and produce a code coverage report at [coverage/index.html](../coverage/index.html). The full test suite is run as a hook on each `git push`. [Mocha](https://mochajs.org) is our preferred test runner.

## Frontend

Unit tests reside in `test/frontend/tests`.

Frontend tests can be ran in the browser by running `npm start` and then browsing to http://localhost:8080/test. Doing it this way will watch for changes and rerun the suite automatically.

You can also run them in headless Chrome by using `npm run test:frontend`. The results will be printed to the console.

## Backend

Unit tests reside in `test/backend`

Backend test can be run with `npm run test:backend`. [Sinon](http://sinonjs.org/) and [proxyquire](https://github.com/thlorenz/proxyquire) are used for mocking.

## Integration

Integration tests include UI tests that run with Selenium.

The preferred way to run these locally is with `npm run test-integration` which requires docker. To watch the tests connect with VNC. On mac enter `vnc://localhost:5900` in Safari and use the password `secret` to connect. For info on debugging a test see the [wdio debug docs](http://webdriver.io/api/utility/debug.html).
