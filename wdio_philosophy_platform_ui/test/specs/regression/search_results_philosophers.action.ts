import browserHelper from '../../helpers/browser.helper.js';
import loginHelper from '../../helpers/login.helper.js';
import commonHelper from '../../helpers/common.helper.js';
import headerHelper from '../../helpers/header.helper.ts';
import SearchResultsHelper from '../../helpers/search_results.helper.ts';
import {pages} from '../../pages.js';
import {registrationPassword} from '../../constants/registration.constants.ts';
import {studentOverview} from '../../constants/login.constants.ts';
import {threeCharsPhilosophers} from '../../constants/header.constants.ts'
import SearchResultsPhilosophersPage from '../../pageobjects/search_results_philosophers.page.ts';
import Header from '../../pageobjects/header.ts';

describe('Search Results Philosophers - Action Verifications - Regression', () => {

    before(async () => {
        await loginHelper.login(studentOverview, registrationPassword);
    });

    beforeEach(async () => {
        await browserHelper.goToPage();
        await headerHelper.openSearchInput();
        await commonHelper.typeText(Header.searchInput, threeCharsPhilosophers);
        await commonHelper.clickAndVerifyRedirect(Header.allMatchedPhilosophersLink, pages.search);
        await commonHelper.verifyDisplayed(SearchResultsPhilosophersPage.page);
    });

    afterEach(async () => {
        await browser.refresh();
    });

    after(async () => {
        await browserHelper.clearSession();
    });

    it('The number of philosopher cards is greater than three.', async () => {
        await commonHelper.verifyDisplayed(SearchResultsPhilosophersPage.philosopherCards[0]);
        const number = await SearchResultsHelper.getNumberOfCards(SearchResultsPhilosophersPage.philosopherCards);
        expect(number).toBeGreaterThan(3);
    });

    it('The text “Results for ‘query value’” is displayed and includes the search query entered by the user.', async () => {
        await commonHelper.verifyElementStartsWithText(SearchResultsPhilosophersPage.queryChipClearButton, threeCharsPhilosophers)
    });

    it('Each displayed philosopher card has a name that contains the search query.', async () => {
        await commonHelper.verifyDisplayed(SearchResultsPhilosophersPage.philosopherCardsNames[0]);
        await SearchResultsHelper.verifyCardsNamesContainText(SearchResultsPhilosophersPage.philosopherCardsNames, threeCharsPhilosophers);
    });

    it('Clicking the cross icon next to the “Results for ‘query value’” text restores the search results.', async () => {
        await commonHelper.clickDisplayedButton(SearchResultsPhilosophersPage.queryChipClearButton);
        await commonHelper.verifyDisplayed(SearchResultsPhilosophersPage.queryChipClearButton, false);
    });

    it('The number of philosopher cards becomes greater than the number displayed before the cross icon was clicked.', async () => {
        await commonHelper.verifyDisplayed(SearchResultsPhilosophersPage.philosopherCards[0]);
        const numberBefore = await SearchResultsHelper.getNumberOfCards(SearchResultsPhilosophersPage.philosopherCards);
        await commonHelper.clickDisplayedButton(SearchResultsPhilosophersPage.queryChipClearButton);
        await commonHelper.verifyDisplayed(SearchResultsPhilosophersPage.philosopherCards[0]);
        const numberAfter = await SearchResultsHelper.getNumberOfCards(SearchResultsPhilosophersPage.philosopherCards);
        expect(numberAfter).toBeGreaterThan(numberBefore);
    });

});