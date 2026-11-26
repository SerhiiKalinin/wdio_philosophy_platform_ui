import PhilosophernPage from '../pageobjects/philosopher.page.ts';
import commonHelper from './common.helper.ts';
import allureReporter from '@wdio/allure-reporter';

class philosopherHelper {
    
    public async followPhilosopher(follow: boolean): Promise<void> {
        if (follow) {
            await commonHelper.clickDisplayedButton(PhilosophernPage.followButton);
            await commonHelper.verifyDisplayed(PhilosophernPage.followingButton, true);
            await commonHelper.verifyDisplayed(PhilosophernPage.followButton, false);
            allureReporter.addStep(`LOG: Student started following the philosopher`);
        } else {
            await commonHelper.clickDisplayedButton(PhilosophernPage.followingButton);
            await commonHelper.verifyDisplayed(PhilosophernPage.followButton, true);
            await commonHelper.verifyDisplayed(PhilosophernPage.followingButton, false);
            allureReporter.addStep(`LOG: Student stopped following the philosopher`);
        }
    }
}

export default new philosopherHelper();
