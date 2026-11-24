import browserHelper from '../../helpers/browser.helper.js';
import loginHelper from '../../helpers/login.helper.js';
import commonHelper from '../../helpers/common.helper.js';
import thoughtsHelper from '../../helpers/thoughts.helper.js';
import PhilosopherPage from '../../pageobjects/philosopher.page.ts';
import OverviewPage from '../../pageobjects/overview.page.js';
import overviewHelper from '../../helpers/overview.helper.ts';
import headerHelper from '../../helpers/header.helper.ts';
import ThoughtsPage from '../../pageobjects/thoughts.page.js';
import LoginPage from '../../pageobjects/login.page.js';
import {pages} from '../../pages.js';
import {registrationPassword} from '../../constants/registration.constants.ts';
import {studentOverview} from '../../constants/login.constants.ts';
import {twoChars} from '../../constants/header.constants.ts'
import {threeCharsEmpty} from '../../constants/header.constants.ts'
import {threeCharsPhilosophers} from '../../constants/header.constants.ts'
import {threeCharsSchools} from '../../constants/header.constants.ts'
import SettingsPage from '../../pageobjects/settings.page.ts';
import philosopherHelper from '../../helpers/philosopher.helper.ts';
import Header from '../../pageobjects/header.ts';

describe('Search Input - Action Verifications - Regression', () => {

    let philosopherId: any;

    beforeEach(async () => {
        await loginHelper.login(studentOverview, registrationPassword);
        await headerHelper.openSearchInput();
    });

    afterEach(async () => {
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
        await commonHelper.typeText(Header.searchInput, threeCharsPhilosophers);
        await commonHelper.verifyDisplayed(Header.philosophersSuggestionOptions[0]);
    });

    it('When there are school results, the school options are displayed.', async () => {
        await commonHelper.typeText(Header.searchInput, threeCharsSchools);
        await commonHelper.verifyDisplayed(Header.schoolsSuggestionOptions[0]);
    });
});

