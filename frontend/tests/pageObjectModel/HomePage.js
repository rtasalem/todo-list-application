const { By } = require('selenium-webdriver');
const TestData = require('../testData/TestData');

class HomePage {
  constructor(driver) {
    this.driver = driver;
  }

  async open() {
    await this.driver.get(TestData.homePageUrl);
  }

  async getCurrentUrl() {
    return await this.driver.getCurrentUrl();
  }

  async getPageTitle() {
    return await this.driver.getTitle();
  }

  async getPageHeader() {
    const heading = await this.driver.findElement(By.css('h1'));
    return await heading.getText();
  }

  async getAddToDoSectionHeader() {
    const heading = await this.driver.findElement(By.className('add-todo'));
    return await heading.getText();
  }

  async getAddToDoInputPlaceholder() {
    const placeholder = await this.driver.findElement(By.xpath("/html/body/div/div/main/div[1]/div/form/input"));
    return await placeholder.getAttribute('placeholder');
  }

  async getSearchFormInputPlaceholder() {
    const placeholder = await this.driver.findElement(By.xpath("/html/body/div/div/main/div[2]/div/form/input"));
    return await placeholder.getAttribute('placeholder');
  }

  async getToDoListsSectionHeader() {
    const heading = await this.driver.findElement(By.className('your-todo-list-container'));
    return await heading.getText();
  }
}

module.exports = HomePage;
