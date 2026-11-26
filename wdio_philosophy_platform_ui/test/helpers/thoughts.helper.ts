import ThoughtsPage from '../pageobjects/thoughts.page.js';
import allureReporter from '@wdio/allure-reporter';

class ThoughtsHelper {

    public async getFirstPhilosopherId(): Promise<string> {
        const href = await ThoughtsPage.philosopherCard(1).getAttribute('href');
        const philosopherId = href?.match(/\/philosopher\/([^/?#]+)/)?.[1];

        if (!philosopherId) {
            throw new Error('Could not read a philosopher ID from the first Thoughts post card');
        }
        allureReporter.addStep(`LOG: philosopherId was extracted successfully: ${philosopherId}`);
        return philosopherId;
    }
}

export default new ThoughtsHelper();
