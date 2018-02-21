/* eslint-disable no-undef, no-process-exit */
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const puppeteer = require('puppeteer');
const webpack = require('webpack');
const config = require('../../webpack.config');
const middleware = require('webpack-dev-middleware');
const express = require('express');
const devRoutes = require('../../server/dev');
const app = express();

const wpm = middleware(webpack(config), { logLevel: 'silent' });
app.use(wpm);
devRoutes(app, { middleware: wpm });

function onConsole(msg) {
  // excluding 'log' because mocha uses it to write the json output
  if (msg.type() !== 'log') {
    console.error(msg.text());
  }
}

const server = app.listen(async function() {
  let exitCode = -1;
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    page.on('console', onConsole);
    page.on('pageerror', console.log.bind(console));
    await page.goto(`http://127.0.0.1:${server.address().port}/test`);
    await page.waitFor(() => typeof runner.testResults !== 'undefined', {
      timeout: 5000
    });
    const results = await page.evaluate(() => runner.testResults);
    const coverage = await page.evaluate(() => __coverage__);
    if (coverage) {
      const dir = path.resolve(__dirname, '../../.nyc_output');
      mkdirp.sync(dir);
      fs.writeFileSync(
        path.resolve(dir, 'frontend.json'),
        JSON.stringify(coverage)
      );
    }
    const stats = results.stats;
    exitCode = stats.failures;
    console.log(`${stats.passes} passing (${stats.duration}ms)\n`);
    if (stats.failures) {
      console.log('Failures:\n');
      for (const f of results.failures) {
        console.log(`${f.fullTitle}`);
        console.log(` ${f.err.stack}\n`);
      }
    }
  } catch (e) {
    console.log(e);
  } finally {
    browser.close();
    server.close(() => {
      process.exit(exitCode);
    });
  }
});
