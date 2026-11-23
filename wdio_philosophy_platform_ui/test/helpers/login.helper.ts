import LoginPage from '../pageobjects/login.page.js';
import browserHelper from './browser.helper.js';
import Header from '../pageobjects/header.ts';
import { pages } from '../pages.js';
import commonHelper from './common.helper.ts';

class LoginHelper {
    /** Log in with an existing student account. */
    public async login(email: string, password: string): Promise<void> {
        await browserHelper.goToPage(pages.login);
        await LoginPage.emailInput.setValue(email);
        await LoginPage.passwordInput.setValue(password);
        await LoginPage.submitButton.click();
        await commonHelper.verifyDisplayed(Header.logoutButton);
    }

    public async wrongCredentials(email: string, password: string): Promise<void> {
        await browserHelper.goToPage(pages.login);
        await LoginPage.emailInput.setValue(email);
        await LoginPage.passwordInput.setValue(password);
        await LoginPage.submitButton.click();
        await commonHelper.verifyDisplayed(LoginPage.wrongCredentialsError);
        await commonHelper.verifyDisplayed(Header.logoutButton, false);
    }    
}

export default new LoginHelper();
