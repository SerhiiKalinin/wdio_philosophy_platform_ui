import { browser, expect } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';
import allureReporter from '@wdio/allure-reporter';

class CommonHelper {
    /** Check whether an element is displayed. */
    public async verifyDisplayed(element: ChainablePromiseElement, expectedDisplayed = true): Promise<void> {
        if (expectedDisplayed) {
            await expect(element).toBeDisplayed();
            allureReporter.addStep(`LOG: Element is displayed`);
        } else {
            await expect(element).not.toBeDisplayed();
            allureReporter.addStep(`LOG: Element is not displayed`);
        }
    }

    /** Wait for a control to display, then click it. */
    public async clickDisplayedButton(button: ChainablePromiseElement): Promise<void> {
        await expect(button).toBeDisplayed();
        await button.click();
        allureReporter.addStep(`LOG: Element was clicked`);
    }

    /** Wait for a control, click it, and verify navigation to the expected URL. */
    public async clickAndVerifyRedirect(button: ChainablePromiseElement, url: string): Promise<void> {
        await expect(button).toBeDisplayed();
        await button.click();
        allureReporter.addStep(`LOG: Element was clicked`);
        await expect(browser).toHaveUrl(expect.stringContaining(url));
        allureReporter.addStep(`LOG: User redirected to '${url}' page`);
    }

    public async verifyElementHasValue(element: ChainablePromiseElement, value: string): Promise<void> {
        await expect(element).toBeDisplayed();
        allureReporter.addStep(`LOG: Element is displayed`);
        await expect(element).toHaveValue(value);
        allureReporter.addStep(`LOG: Element has value='${value}'`);
    }
}

export default new CommonHelper();
