import allureReporter from '@wdio/allure-reporter';
import type { ChainablePromiseElement } from 'webdriverio';
import type { ChainablePromiseArray } from 'webdriverio';
import commonHelper from '../helpers/common.helper.js';

class SearchResultsHelper {

    public async getNumberOfCards(cards: ChainablePromiseArray): Promise<number> {
        const number = (await cards).length;
        allureReporter.addStep(`LOG: Number of cards is ${number}`);
        return number;
    }

    public async verifyCardsNamesContainText(cardsNames: ChainablePromiseArray, text: string): Promise<void> {
        const elements = await cardsNames;
        const expectedText = text.trim().toLowerCase();
        const mismatches: string[] = [];

        for (let i = 0; i < elements.length; i++) {
            const actualText = (await elements[i].getText()).trim();

            if (!actualText.toLowerCase().includes(expectedText)) {
                mismatches.push(
                    `Card #${i + 1}: expected to contain '${text}', actual: '${actualText}'`
                );
            }
        }

        if (mismatches.length > 0) {
            const message =
                `Cards names do not contain '${text}':\n${mismatches.join('\n')}`;

            allureReporter.addStep(`ERROR: ${message}`);
            throw new Error(message);
        }

        allureReporter.addStep(
            `LOG: All cards names contain text='${text}'`
        );
    }
}

export default new SearchResultsHelper();
