// This test checks that the homepage is rendered correctly and that the correct elements are present

// To run tests: npx mocha <filename> 

// This environment instruction removes linting errors
/* eslint-env mocha */

const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const TestData = require('./testData/TestData');
const HomePage = require('./pageObjectModel/HomePage');

describe('Homepage Test', function () {
  let driver;
  let homepage;

  before(async function () {
    this.timeout(10000);
    driver = await new Builder().forBrowser('chrome').build();
    homepage = new HomePage(driver);
    await homepage.open();
    await driver.manage().setTimeouts({ implicit: 5000 });
    await driver.manage().window().maximize();
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  // Page URL
  it('should have the correct URL', async function () {
    let currentUrl = await homepage.getCurrentUrl();
    assert.equal(currentUrl, TestData.homePageUrl);
    console.log("********** Current URL **********", currentUrl);
  });

  // Page title
  it('should have the correct title', async function () {
    let title = await homepage.getPageTitle();
    assert.equal(title, TestData.homePageTitle);
    console.log("********** Home Page Title **********", title);
  });

  // Page header
  it('should have the correct page header', async function () {
    let header = await homepage.getPageHeader();
    assert.equal(header, TestData.pageHeader);
    console.log("********** Page Header **********", header);
  });

  // Add To-Do header
  it('should have the correct header for the Add To-Do section', async function () {
    let header = await homepage.getAddToDoSectionHeader();
    assert.equal(header, TestData.addToDoSectionHeader);
    console.log("********** Add To-Do Section Header **********", header);
  });

  // Add To-Do input form
  it('should have the correct placeholder text', async function () {
    let placeholder = await homepage.getAddToDoInputPlaceholder();
    assert.equal(placeholder, TestData.addToDoInputPlaceholder);
    console.log("********** Add To-Do Input Placeholder Text **********", placeholder);
  });

  // Search form input
  it('should have the correct placeholder text', async function () {
    let placeholder = await homepage.getSearchFormInputPlaceholder();
    assert.equal(placeholder, TestData.searchFormInputPlaceholder);
    console.log("********** Search Form Input Placeholder Text **********", placeholder);
  });

  // To-Do Lists header
  it('should have the correct header for the To-Do Lists section', async function () {
    let header = await homepage.getToDoListsSectionHeader();
    assert.equal(header, TestData.toDoListsSectionHeader);
    console.log("********** To-Do List Section Header **********", header);
  });

});
