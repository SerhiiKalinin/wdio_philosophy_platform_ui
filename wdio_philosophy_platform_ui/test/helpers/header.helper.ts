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

    
    public async verifyListContainsSearchQuery(options: ChainablePromiseArray, searchQuery: string): Promise<void> {
        const optionTexts = await options.map(
            async (option) => (await option.getText()).trim()
        );
        const mismatchedOptions = optionTexts.filter(
            (text) => !text.toLowerCase().includes(searchQuery)
        );
        expect(mismatchedOptions).toEqual([]);
    }

    public async openSearchInputAndWaitList(searchText: string, suggestionElement: ChainablePromiseElement): Promise<void> {
        await commonHelper.typeText(Header.searchInput, searchText);
        await commonHelper.verifyDisplayed(suggestionElement);
        allureReporter.addStep(`LOG: Search input activated`);
    }

    public async getEntityId(element: ChainablePromiseElement): Promise<string> {
        const href = await element.getAttribute('href');
        const entityId = href?.match(/\/([^/?#]+)\/([^/?#]+)/)?.[2];
        if (!entityId) {
            throw new Error('Could not extract entity ID from element href');
        }
        allureReporter.addStep(`LOG: Entity ID was extracted successfully: ${entityId}`);
        return entityId;
    }  
}

export default new headerHelper();
