import browserHelper from '../helpers/browser.helper.js';
import registrationHelper from '../helpers/registration.helper.js';
import loginHelper from '../helpers/login.helper.js';
import commonHelper from '../helpers/common.helper.js';
import thoughtsHelper from '../helpers/thoughts.helper.js';
import RegistrationPage from '../pageobjects/registration.page.js';
import PhilosopherPage from '../pageobjects/philosopher.page.ts';
import OverviewPage from '../pageobjects/overview.page.js';
import ThoughtsPage from '../pageobjects/thoughts.page.js';
import { pages } from '../pages.js';
import { registrationPassword } from '../constants/registration.constants.ts';
import { studentNew } from '../constants/login.constants.ts';
import { studentOverview } from '../constants/login.constants.ts';

describe('Student Account Lifecycle - Smoke', () => {
    // Create one student for this linked smoke journey and reuse the account in later tests.
    const studentEmail = registrationHelper.createUniqueEmail();

    before(async () => {
        await browserHelper.prepareTestRun(pages.registration);
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
        const philosopherId = await thoughtsHelper.getFirstPhilosopherId();
        await commonHelper.clickAndVerifyRedirect(ThoughtsPage.philosopherCard(1), pages.philosopher(philosopherId));
        await commonHelper.verifyDisplayed(PhilosopherPage.page);
    });

    // it('Clicking the “Follow” button on the philosopher’s page allows the Student to follow that philosopher.', async () => {
    //     //await commonHelper.verifyDisplayed(ThoughtsPage.firstPhilosopherPostCard);
    // });    

    // it('Clicking the “Overview” link navigates the Student to the Overview page.', async () => {
    //     //await commonHelper.verifyDisplayed(ThoughtsPage.firstPhilosopherPostCard);
    // });  
    
    // it('The Overview empty-state quote is not displayed.', async () => {
    //     await loginHelper.loginStudent(studentEmail, registrationPassword);
    //     await commonHelper.verifyDisplayed(OverviewPage.emptyStateQuote, false);
    // });

    // it('The Overview empty-state CTA is not displayed.', async () => {
    //     await loginHelper.loginStudent(studentEmail, registrationPassword);
    //     await commonHelper.verifyDisplayed(OverviewPage.emptyStateCta, false);
    // });    
});
