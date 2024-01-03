// This test checks that the basic crud functionality works correctly
// To run tests: npx mocha <filename> 

// This environment instruction removes linting errors
/* eslint-env mocha */

const { Builder, Key } = require('selenium-webdriver');
const assert = require('assert');
const TestData = require('./testData/TestData');
const HomePage = require('./pageObjectModel/HomePage');

describe('CRUD Test', function () {
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

    // Add a task by name using the add a to-do input form and verify that it has been added
    it('should add a task by name using the add a to-do input form', async function () {
        const addToDoInput = await homepage.getAddToDoInput();
        await addToDoInput.sendKeys(TestData.testTask);
        await addToDoInput.sendKeys(Key.ENTER);
        // verify that task has been added
        let task = await homepage.getTaskByName(TestData.testTask);
        assert.equal(task, TestData.testTask);
        console.log("********** Task Added **********", task);
    });

    // Delete a task by name using the delete button and verify that it has been deleted
    it('should delete a task by name using the delete button', async function () {
        // click delete button
        const deleteButton = await homepage.getDeleteButton();
        await deleteButton.click();

        // verify that task has been deleted
        let task = await homepage.getTaskByName(TestData.testTask);
        console.log("********** Task After Deletion **********", task);
        assert.equal(task, null);
        console.log("********** Task Deleted **********", task);
    });

    // Add a task with name, date and description using the modal and verify that it has been added and data persists
    it('should add a task with name, date and description using the modal', async function () {
        // click add button
        const addButton = await homepage.getAddButton();
        await addButton.click();

        // enter task name
        const taskNameInput = await homepage.getAddToDoInputModal();
        await taskNameInput.click();
        await taskNameInput.sendKeys(TestData.testTask);

        // enter task description
        const taskDescriptionInput = await homepage.getTaskDescriptionInputModal();
        await taskDescriptionInput.click();
        await taskDescriptionInput.sendKeys(TestData.testDescription);
       
        // enter task date
        const taskDateInput = await homepage.getTaskDateInputModal();
        await taskDateInput.click();
        await taskDateInput.sendKeys(TestData.testDateDay);
        await taskDateInput.sendKeys(TestData.testDateMonth);
        await taskDateInput.sendKeys(TestData.testDateYear);

        // click save button
        const saveButton = await homepage.getSaveButtonModal();
        await saveButton.click();

        // verify that task has been added
        let task = await homepage.getTaskByName(TestData.testTask);
        assert.equal(task, TestData.testTask);
        console.log("********** Task Added **********", task);
    
    });
    
    // edit a task name and verify that the data has been persisted
    it('should edit a task name and verify that the data has been persisted', async function () {
        // click edit button
        const editButton = await homepage.getEditButton();
        await editButton.click();

        // enter task name
        const taskNameInput = await homepage.getAddToDoInputModalEdit();
        await taskNameInput.click();
        await taskNameInput.clear();
        await taskNameInput.sendKeys(TestData.editedTaskName);

        // click save button
        const saveButton = await homepage.getSaveButtonModalEdit();
        await saveButton.click();

        // verify that task has been edited
        let task = await homepage.getTaskByName(TestData.testTask);
        assert.equal(task, TestData.editedTaskName);
        console.log("********** Task Edited **********", task);
    });

});
