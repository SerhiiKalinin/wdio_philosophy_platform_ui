import commonHelper from './common.helper.ts';
import {pages} from '../pages.js';
import Header from '../pageobjects/header.ts';
import LoginPage from '../pageobjects/login.page.js';
import allureReporter from '@wdio/allure-reporter';

class headerHelper {

    public async logout(): Promise<void> {
        await commonHelper.clickAndVerifyRedirect(Header.logoutButton, pages.login);
        await commonHelper.verifyDisplayed(LoginPage.page);
        allureReporter.addStep(`LOG: User logged out`);
    }

    public async openSearchInput(): Promise<void> {
        await commonHelper.clickDisplayedButton(Header.searchButton);
        await commonHelper.verifyDisplayed(Header.searchInput);
        allureReporter.addStep(`LOG: Search input activated`);
    }
}

export default new headerHelper();
