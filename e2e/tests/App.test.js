const puppeteer = require('puppeteer');
const http = require('http');
const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

require('dotenv').config();
const app = require('../../backend/src/app');

let backend;
let frontend;
let browser;
let page;

beforeAll(() => {
  backend = http.createServer(app);
  backend.listen(3010, () => {
    console.log('Backend Running at http://localhost:3010');
  });
  frontend = http.createServer(
    express()
      .use('/v0', createProxyMiddleware({ 
        target: 'http://localhost:3010/',
        changeOrigin: true}))
      .use(express.static(path.join(__dirname, '..', '..', 'frontend', 'build')))
  );
  frontend.listen(3000, () => {
    console.log('Frontend Running at http://localhost:3000');
  });
});

afterAll((done) => {
  backend.close(() => { 
    frontend.close(done);
  });
});

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--headless',
    ],
  });
  page = await browser.newPage();
});

afterEach(async () => {
  await browser.close();
});

// Clicks the 'Get Dummy' button and checks the server response is displayed.
test('Get header', async () => {
  await page.goto('http://localhost:3000');
  const label = await page.$('aria/logo');
  let cont = await (await label.getProperty('textContent')).jsonValue();
  expect(cont).toBe('Facebook');
//   await page.click('aria/get dummy[role="button"]');
//   await page.waitForFunction(
//     'document.querySelector("label").innerText.includes("Hello CSE183")',
//   );
//   cont = await (await label.getProperty('textContent')).jsonValue();
//   expect(cont.search(/Hello CSE183/)).toEqual(0);
//   expect(cont.search(/Database created/)).toBeGreaterThan(60);
});

// Clicks the 'Get Dummy' button and checks the server response is displayed.
test('Get Login', async () => {
    await page.goto('http://localhost:3000');
    const label = await page.$('aria/login');
    let cont = await (await label.getProperty('textContent')).jsonValue();
    expect(cont).toBe('Log In');
  //   await page.click('aria/get dummy[role="button"]');
  //   await page.waitForFunction(
  //     'document.querySelector("label").innerText.includes("Hello CSE183")',
  //   );
  //   cont = await (await label.getProperty('textContent')).jsonValue();
  //   expect(cont.search(/Hello CSE183/)).toEqual(0);
  //   expect(cont.search(/Database created/)).toBeGreaterThan(60);
  });

test('Anyone can view list', async () => {
    await page.goto('http://localhost:3000');
    await page.waitForFunction(
    'document.getElementById("listing name Nike visor").innerText.includes("Nike visor")',
    );
});

test('Listings can be viewed by category & subcategory', async () => {
    await page.goto('http://localhost:3000');
    const label = await page.$('aria/cat-main-Electronics');
    let cont = await (await label.getProperty('textContent')).jsonValue();
    expect(cont).toBe('Electronics');
});
