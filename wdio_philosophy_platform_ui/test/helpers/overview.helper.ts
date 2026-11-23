import OverviewPage from '../pageobjects/overview.page.ts';
import {expect} from '@wdio/globals';
import allure from '@wdio/allure-reporter';

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
    }
}

export default new OverviewHelper();