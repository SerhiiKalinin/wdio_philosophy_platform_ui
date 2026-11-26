import browserHelper from '../../helpers/browser.helper.js';
import loginHelper from '../../helpers/login.helper.js';
import commonHelper from '../../helpers/common.helper.js';
import PhilosopherPage from '../../pageobjects/philosopher.page.ts';
import headerHelper from '../../helpers/header.helper.ts';
import {pages} from '../../pages.js';
import {registrationPassword} from '../../constants/registration.constants.ts';
import {studentOverview} from '../../constants/login.constants.ts';
import {twoChars} from '../../constants/header.constants.ts'
import {threeCharsEmpty} from '../../constants/header.constants.ts'
import {threeCharsPhilosophers} from '../../constants/header.constants.ts'
import {threeCharsSchools} from '../../constants/header.constants.ts'
import {philosophersListTitle} from '../../constants/header.constants.ts'
import {schoolsListTitle} from '../../constants/header.constants.ts'
import {fiveCharsPhilosophers} from '../../constants/header.constants.ts'
import {fiveCharsSchools} from '../../constants/header.constants.ts'
import {philosopherNameExact} from '../../constants/header.constants.ts'
import {schoolNameExact} from '../../constants/header.constants.ts'
import SchoolPage from '../../pageobjects/school.page.ts';
import Header from '../../pageobjects/header.ts';

describe('Search Input - Action Verifications - Regression', () => {

    before(async () => {
        await loginHelper.login(studentOverview, registrationPassword);
    });

    beforeEach(async () => {
        await browserHelper.goToPage();
        await headerHelper.openSearchInput();
    });

    afterEach(async () => {
        await browser.refresh();
    });

    after(async () => {
        await browserHelper.clearSession();
    });

    it('When two characters are entered, the suggestion dropdown list is not displayed.', async () => {
        await commonHelper.typeText(Header.searchInput, twoChars);
        await commonHelper.verifyDisplayed(Header.searchLoading, false);
        await commonHelper.verifyDisplayed(Header.searchNoResults, false);
    });

    it('When three characters are entered but no suggestions exist, the “No results found” text is displayed.', async () => {
        await commonHelper.typeText(Header.searchInput, threeCharsEmpty);
        await commonHelper.verifyDisplayed(Header.searchNoResults);
    });

    it('When three characters are entered, the suggestion list appears.', async () => {
        await commonHelper.typeText(Header.searchInput, threeCharsPhilosophers);
        await commonHelper.verifyDisplayed(Header.searchNoResults, false);
        await commonHelper.verifyDisplayed(Header.suggestionsPhilosophersList);
        await commonHelper.verifyDisplayed(Header.suggestionsSchoolsList);
    });

    it('When there are philosopher results, the philosopher options are displayed.', async () => {
        await headerHelper.openSearchInputAndWaitList(threeCharsPhilosophers, Header.philosophersSuggestionOptions[0]);
    });

    it('When there are school results, the school options are displayed.', async () => {
        await headerHelper.openSearchInputAndWaitList(threeCharsSchools, Header.schoolsSuggestionOptions[0]);
    });

    it('Philosopher suggestions contain the characters entered in the input.', async () => {
        await headerHelper.openSearchInputAndWaitList(threeCharsPhilosophers, Header.philosophersSuggestionOptions[0]);
        await headerHelper.verifyListContainsSearchQuery(Header.philosophersSuggestionOptions, threeCharsPhilosophers);
    });

    it('School suggestions contain the characters entered in the input.', async () => {
        await headerHelper.openSearchInputAndWaitList(threeCharsSchools, Header.schoolsSuggestionOptions[0]);
        await headerHelper.verifyListContainsSearchQuery(Header.schoolsSuggestionOptions, threeCharsSchools);
    });

    it('Philosopher suggestions have the “Philosophers” label.', async () => {
        await commonHelper.typeText(Header.searchInput, threeCharsPhilosophers);
        await commonHelper.verifyElementHasText(Header.philosopherListTitle, philosophersListTitle);
    });

    it('School suggestions have the “Schools” label.', async () => {
        await commonHelper.typeText(Header.searchInput, threeCharsSchools);
        await commonHelper.verifyElementHasText(Header.schoolsListTitle,schoolsListTitle);
    });

    it('When there are more than three philosopher suggestions, the “See all matched philosophers” link is displayed.', async () => {
        await headerHelper.openSearchInputAndWaitList(threeCharsPhilosophers, Header.philosophersSuggestionOptions[0]);
        await commonHelper.verifyDisplayed(Header.allMatchedPhilosophersLink);
    });

    it('When there are three or fewer philosopher suggestions, the “See all matched philosophers” link is not displayed.', async () => {
        await headerHelper.openSearchInputAndWaitList(fiveCharsPhilosophers, Header.philosophersSuggestionOptions[0]);
        await commonHelper.verifyDisplayed(Header.allMatchedPhilosophersLink, false);
    });

    it('When there are more than three school suggestions, the “See all matched schools” link is displayed.', async () => {
        await headerHelper.openSearchInputAndWaitList(threeCharsSchools, Header.schoolsSuggestionOptions[0]);
        await commonHelper.verifyDisplayed(Header.allMatchedSchoolsLink);
    });

    it('When there are three or fewer school suggestions, the “See all matched schools” link is not displayed.', async () => {
        await headerHelper.openSearchInputAndWaitList(fiveCharsSchools, Header.schoolsSuggestionOptions[0]);
        await commonHelper.verifyDisplayed(Header.allMatchedSchoolsLink, false);
    });

    it('Clicking the “See all matched philosophers” link navigates to the search results page with type=philosophers.', async () => {
        await commonHelper.typeText(Header.searchInput, threeCharsPhilosophers);
        await commonHelper.clickAndVerifyRedirect(Header.allMatchedPhilosophersLink, [pages.search, threeCharsPhilosophers, philosophersListTitle]);
    });

    it('Clicking the “See all matched schools” link navigates to the search results page with type=schools.', async () => {
        await commonHelper.typeText(Header.searchInput, threeCharsSchools);
        await commonHelper.clickAndVerifyRedirect(Header.allMatchedSchoolsLink, [pages.search, threeCharsSchools, schoolsListTitle]);
    });

    it('Clicking a philosopher suggestion navigates to the philosopher page.', async () => {
        await commonHelper.typeText(Header.searchInput, threeCharsPhilosophers);
        const philosopherId = await headerHelper.getEntityId(Header.philosophersSuggestionOptions[0]);
        await commonHelper.clickAndVerifyRedirect(Header.philosophersSuggestionOptions[0], pages.philosopher(philosopherId));
    });

    it('Clicking a school suggestion navigates to the school page.', async () => {
        await commonHelper.typeText(Header.searchInput, threeCharsSchools);
        const schoolId = await headerHelper.getEntityId(Header.schoolsSuggestionOptions[0]);
        await commonHelper.clickAndVerifyRedirect(Header.schoolsSuggestionOptions[0], pages.school(schoolId));
    });

    it('When the search query exactly matches a philosopher`s name, pressing Enter navigates to the philosopher page.', async () => {
        await commonHelper.typeText(Header.searchInput, philosopherNameExact);
        await commonHelper.verifyElementHasText(Header.philosophersSuggestionOptions[0], philosopherNameExact);
        const philosopherId = await headerHelper.getEntityId(Header.philosophersSuggestionOptions[0]);
        await commonHelper.submitWithEnterAndVerifyRedirect(pages.philosopher(philosopherId));
    });

    it('The philosopher`s name matches the search query exactly on the philosopher page.', async () => {
        await commonHelper.typeText(Header.searchInput, philosopherNameExact);
        await commonHelper.verifyElementHasText(Header.philosophersSuggestionOptions[0], philosopherNameExact);
        await browser.keys('Enter');
        await commonHelper.verifyElementHasText(PhilosopherPage.philosopherName, philosopherNameExact);
    });

    it('When the search query exactly matches a school`s name, pressing Enter navigates to the school page.', async () => {
        await commonHelper.typeText(Header.searchInput, schoolNameExact);
        await commonHelper.verifyElementHasText(Header.schoolsSuggestionOptions[0], schoolNameExact);
        const schoolId = await headerHelper.getEntityId(Header.schoolsSuggestionOptions[0]);
        await commonHelper.submitWithEnterAndVerifyRedirect(pages.school(schoolId));
    });

    it('The school`s name matches the search query exactly on the school page.', async () => {
        await commonHelper.typeText(Header.searchInput, schoolNameExact);
        await commonHelper.verifyElementHasText(Header.schoolsSuggestionOptions[0], schoolNameExact);
        await browser.keys('Enter');
        await commonHelper.verifyElementHasText(SchoolPage.schoolName, schoolNameExact);
    });
});

