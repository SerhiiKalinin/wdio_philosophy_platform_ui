import browserHelper from '../helpers/browser.helper.js';
import registrationHelper from '../helpers/registration.helper.js';
import loginHelper from '../helpers/login.helper.js';
import commonHelper from '../helpers/common.helper.js';
import thoughtsHelper from '../helpers/thoughts.helper.js';
import RegistrationPage from '../pageobjects/registration.page.js';
import PhilosopherPage from '../pageobjects/philosopher.page.ts';
import OverviewPage from '../pageobjects/overview.page.js';
import overviewHelper from '../helpers/overview.helper.ts';
import headerHelper from '../helpers/header.helper.ts';
import ThoughtsPage from '../pageobjects/thoughts.page.js';
import LoginPage from '../pageobjects/login.page.js';
import {pages} from '../pages.js';
import {registrationPassword} from '../constants/registration.constants.ts';
import {defaultStudentName} from '../constants/settings.constants.ts';
import SettingsPage from '../pageobjects/settings.page.ts';
import philosopherHelper from '../helpers/philosopher.helper.ts';
import Header from '../pageobjects/header.ts';

describe('Student Account Lifecycle - Smoke', () => {

    const studentEmail = registrationHelper.createUniqueEmail();
    let philosopherId: any;

    before(async () => {
        await browserHelper.goToPage(pages.registration);
    });

    after(async () => {
        await browserHelper.clearSession();
    });

    it('When valid registration details are submitted, the registration form is displayed in its success state, and the user is redirected to the overview page.', async () => {
        await registrationHelper.submitValidRegistration(studentEmail, registrationPassword);
        await commonHelper.verifyDisplayed(RegistrationPage.successState);
        await commonHelper.verifyDisplayed(OverviewPage.page);
    });

    it('Newly registered students have no post cards on the Overview page.', async () => {
        await commonHelper.verifyDisplayed(OverviewPage.postsGrid, false);
    });

    it('The Overview empty-state quote is displayed.', async () => {
        await commonHelper.verifyDisplayed(OverviewPage.emptyStateQuote);
    });

    it('The Overview empty-state CTA is displayed.', async () => {
        await commonHelper.verifyDisplayed(OverviewPage.emptyStateCta);
    });

    it('Clicking the Overview empty-state CTA navigates the Student to the Thoughts page.', async () => {
        await commonHelper.clickAndVerifyRedirect(OverviewPage.emptyStateCta, pages.thoughts);
    });

    it('The Thoughts page displays post cards of philosophers.', async () => {
        await commonHelper.verifyDisplayed(ThoughtsPage.philosopherPostCardsGrid);
    });

    it('Clicking a philosopher’s post card navigates the Student to the philosopher’s page.', async () => {
        philosopherId = await thoughtsHelper.getFirstPhilosopherId();
        await commonHelper.clickAndVerifyRedirect(ThoughtsPage.philosopherCard(1), pages.philosopher(philosopherId));
        await commonHelper.verifyDisplayed(PhilosopherPage.page);
    });

    it('Clicking the “Follow” button on the philosopher’s page allows the Student to follow that philosopher.', async () => {
        await philosopherHelper.followPhilosopher(true);
    });

    it('Clicking the “Overview” link navigates the Student to the Overview page.', async () => {
        await commonHelper.clickAndVerifyRedirect(Header.overviewLink, pages.overview);
        await commonHelper.verifyDisplayed(OverviewPage.page);
    });  
    
    it('The Overview empty-state quote is not displayed.', async () => {
        await commonHelper.verifyDisplayed(OverviewPage.emptyStateQuote, false);
    });

    it('The Overview empty-state CTA is not displayed.', async () => {
        await commonHelper.verifyDisplayed(OverviewPage.emptyStateCta, false);
    });
    
    it('The Overview page displays cards for the philosopher followed by the Student.', async () => {
        await overviewHelper.verifyPhilosopherIds(philosopherId);
    }); 

    it('Student is able to log out.', async () => {
        await headerHelper.logout();
    }); 

    it('Student is able to log in.', async () => {
        await loginHelper.login(studentEmail, registrationPassword);
    });

    it('Clicking “Settings” navigates the Student to the Settings page.', async () => {
        await commonHelper.clickAndVerifyRedirect(Header.settingsLink, pages.settings);
        await commonHelper.verifyDisplayed(SettingsPage.page);    
    });

    it('By default the Student has “Student” name on the Settings page.', async () => {
        await commonHelper.verifyElementHasValue(SettingsPage.nameInput, defaultStudentName);
    });
    
    it('Clicking “Delete Account” opens the Delete Account modal.', async () => {
        await commonHelper.clickDisplayedButton(SettingsPage.deleteAccountButton);
        await commonHelper.verifyDisplayed(SettingsPage.deleteConfirmationModal);
    });

    it('Confirming the deletion in the Delete Account modal logs the Student out and deletes the account.', async () => {
        await commonHelper.clickAndVerifyRedirect(SettingsPage.confirmDeleteAccountButton, pages.login);
        await commonHelper.verifyDisplayed(LoginPage.page);
    });

    it('Student cannot log in after the account is deleted.', async () => {
        await loginHelper.wrongCredentials(studentEmail, registrationPassword);
    });
});

