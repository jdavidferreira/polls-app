const puppeteer = require("puppeteer")
const mongoose = require("mongoose")
const app = require("../../app")

let server
let page
let browser



beforeAll(async () => {
  const width = 1920, height = 1080

  server = app.listen(3000);

  browser = await puppeteer.launch({
    headless: true,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});

beforeEach(async () => {
  for (const i in mongoose.connection.collections) {
    await mongoose.connection.collections[i].deleteOne({})
  }
})

afterAll(async () => {
  server.close()
  await mongoose.disconnect()
  browser.close()
})

test("user can register and login", async () => {
  await page.goto("http://localhost:3000/")
  await page.click('a[href="/user/new"]')

  // registrarse
  await page.waitFor('input[id=email]')
  await page.type("input[id=email]", "mrjdavidfg@gmail.com")
  await page.type("input[id=password]", "1234")
  const nav = page.waitForNavigation()
  await page.click("button[type=submit]")
  await nav;

  expect(page.url()).toBe("http://localhost:3000/session/new")
  
  // login
  await page.type("input[id=email]", "mrjdavidfg@gmail.com")
  await page.type("input[id=password]", "1234")
  const nav2 = page.waitForNavigation()
  await page.click("button[type=submit]")
  await nav2;

  expect(page.url()).toBe("http://localhost:3000/")
})