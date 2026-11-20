import StudentLoginPage from '../pageobjects/student-login.page.js';
import browserHelper from './browser.helper.js';
import Header from '../pageobjects/header.ts';
import { pages } from '../pages.js';

class LoginHelper {
    /** Log in with an existing student account. */
    public async loginStudent(email: string, password: string): Promise<void> {
        await browserHelper.prepareTestRun(pages.login);
        await StudentLoginPage.emailInput.setValue(email);
        await StudentLoginPage.passwordInput.setValue(password);
        await StudentLoginPage.submitButton.click();
        await expect(await Header.logoutButton).toBeDisplayed();
    }
}

export default new LoginHelper();
