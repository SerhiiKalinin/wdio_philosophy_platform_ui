import browserHelper from '../../helpers/browser.helper.js';
import loginHelper from '../../helpers/login.helper.js';
import commonHelper from '../../helpers/common.helper.js';
import headerHelper from '../../helpers/header.helper.ts';
import SearchResultsHelper from '../../helpers/search_results.helper.ts';
import {pages} from '../../pages.js';
import {registrationPassword} from '../../constants/registration.constants.ts';
import {studentOverview} from '../../constants/login.constants.ts';
import {schoolsListTitle} from '../../constants/header.constants.ts'
import {fiveCharsSchools2} from '../../constants/header.constants.ts'
import SearchResultsSchoolsPage from '../../pageobjects/search_results_schools.page.ts';
import Header from '../../pageobjects/header.ts';

describe('Search Results Schools - Action Verifications - Regression', () => {

    before(async () => {
        await loginHelper.login(studentOverview, registrationPassword);
    });

    beforeEach(async () => {
        await browserHelper.goToPage();
        await headerHelper.openSearchInput();
        await commonHelper.typeText(Header.searchInput, fiveCharsSchools2);
        await commonHelper.clickAndVerifyRedirect(Header.allMatchedSchoolsLink, pages.search);
        await commonHelper.verifyDisplayed(SearchResultsSchoolsPage.page);
    });

    afterEach(async () => {
        await browser.refresh();
    });

    after(async () => {
        await browserHelper.clearSession();
    });

    it('The number of school cards is greater than three.', async () => {
        await commonHelper.verifyDisplayed(SearchResultsSchoolsPage.schoolCards[0]);
        const number = await SearchResultsHelper.getNumberOfCards(SearchResultsSchoolsPage.schoolCards);
        expect(number).toBeGreaterThan(3);
    });

    it('The text “Results for ‘query value’” is displayed and includes the search query entered by the user.', async () => {
        await commonHelper.verifyElementStartsWithText(SearchResultsSchoolsPage.queryChipClearButton, fiveCharsSchools2)
    });

    it('Each displayed school card has a name that contains the search query.', async () => {
        await commonHelper.verifyDisplayed(SearchResultsSchoolsPage.schoolCards[0]);
        await SearchResultsHelper.verifyCardsNamesContainText(SearchResultsSchoolsPage.schoolCards, fiveCharsSchools2);
    });

    it('Clicking the cross icon next to the “Results for ‘query value’” text restores the search results.', async () => {
        await commonHelper.clickDisplayedButton(SearchResultsSchoolsPage.queryChipClearButton);
        await commonHelper.verifyDisplayed(SearchResultsSchoolsPage.queryChipClearButton, false);
    });

    it('The number of school cards becomes greater than the number displayed before the cross icon was clicked.', async () => {
        await commonHelper.verifyDisplayed(SearchResultsSchoolsPage.schoolCards[0]);
        const numberBefore = await SearchResultsHelper.getNumberOfCards(SearchResultsSchoolsPage.schoolCards);
        await commonHelper.clickDisplayedButton(SearchResultsSchoolsPage.queryChipClearButton);
        await commonHelper.clickAndVerifyRedirect(SearchResultsSchoolsPage.schoolsTabButton, [pages.search, schoolsListTitle]);
        await commonHelper.verifyDisplayed(SearchResultsSchoolsPage.schoolCards[0]);
        const numberAfter = await SearchResultsHelper.getNumberOfCards(SearchResultsSchoolsPage.schoolCards);
        expect(numberAfter).toBeGreaterThan(numberBefore);
    });

});