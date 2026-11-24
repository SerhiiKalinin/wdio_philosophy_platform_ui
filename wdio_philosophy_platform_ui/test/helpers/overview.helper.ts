import OverviewPage from '../pageobjects/overview.page.ts';
import {expect} from '@wdio/globals';
import allureReporter from '@wdio/allure-reporter';

class OverviewHelper {
    public async verifyPhilosopherIds(philosopherId: number) {
        const philosopherLinks = await OverviewPage.philosopherLinks;
        expect(philosopherLinks.length).toBeGreaterThan(0);
        
        const philosopherIds = await Promise.all(
            await philosopherLinks.map(async link =>
                Number((await link.getAttribute('href'))?.split('/').pop())
            )
        );
        expect(philosopherIds.every(id => id === Number(philosopherId))).toBe(true);
        allureReporter.addStep(`LOG: All post cards belong to philosopher with id='${philosopherId}'`);
    }
}

export default new OverviewHelper();