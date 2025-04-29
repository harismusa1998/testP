const { test, expect } = require('@playwright/test');
const { validUser, invalidEmailUser, existingEmailUser } = require('../../utils/testData');

test.describe('Etherscan Registration Form', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('https://etherscan.io/register');
    });
  
    test('Register with valid data', async ({ page }) => {
      await page.fill('#ContentPlaceHolder1_txtUserName', validUser.username);
      await page.fill('#ContentPlaceHolder1_txtEmail', validUser.email);
      await page.fill('#ContentPlaceHolder1_txtConfirmEmail', validUser.email)
      await page.fill('#ContentPlaceHolder1_txtPassword', validUser.password);
      await page.fill('#ContentPlaceHolder1_txtPassword2', validUser.password);
      await page.click('#ContentPlaceHolder1_MyCheckBox')
      await page.click('#ContentPlaceHolder1_btnRegister');
      
      await expect(page).toHaveURL(/.*verifyemail/);
    });
  
    test('Show error on invalid email format', async ({ page }) => {
      await page.fill('#ContentPlaceHolder1_txtEmail', invalidEmailUser.email);
      await page.click('#ContentPlaceHolder1_MyCheckBox')
      await page.click('#ContentPlaceHolder1_btnRegister');
  
      await expect(page.locator('#ContentPlaceHolder1_txtEmail-error')).toHaveText('Please enter a valid email address.');
    });
  
    test('Show error for already registered email', async ({ page }) => {
      await page.fill('#ContentPlaceHolder1_txtUserName', validUser.username);
      await page.fill('#ContentPlaceHolder1_txtEmail', validUser.email);
      await page.fill('#ContentPlaceHolder1_txtConfirmEmail', validUser.email)
      await page.fill('#ContentPlaceHolder1_txtPassword', validUser.password);
      await page.fill('#ContentPlaceHolder1_txtPassword2', validUser.password);
      await page.click('#ContentPlaceHolder1_MyCheckBox')
      await page.click('#ContentPlaceHolder1_btnRegister');
  
      await expect(page.locator('.alert.alert-danger')).toHaveText('Sorry! The username you entered is already in use.');
    });
  
    test('Show error when fields are blank', async ({ page }) => {
      await page.click('#ContentPlaceHolder1_btnRegister');
      await expect(page.locator('#ContentPlaceHolder1_txtEmail-error')).toHaveText('Please enter a valid email address.');
    
    });
  
  
  });
