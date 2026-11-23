import commonHelper from './common.helper.ts';
import {pages} from '../pages.js';
import Header from '../pageobjects/header.ts';
import LoginPage from '../pageobjects/login.page.js';

class headerHelper {

    public async logout(): Promise<void> {
        await commonHelper.clickAndVerifyRedirect(Header.logoutButton, pages.login);
        await commonHelper.verifyDisplayed(LoginPage.page);
    }
}

export default new headerHelper();
