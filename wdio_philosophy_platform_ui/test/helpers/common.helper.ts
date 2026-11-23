import { browser, expect } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';

class CommonHelper {
    /** Check whether an element is displayed. */
    public async verifyDisplayed(element: ChainablePromiseElement, expectedDisplayed = true): Promise<void> {
        if (expectedDisplayed) {
            await expect(element).toBeDisplayed();
        } else {
            await expect(element).not.toBeDisplayed();
        }
    }

    /** Wait for a control to display, then click it. */
    public async clickDisplayedButton(button: ChainablePromiseElement): Promise<void> {
        await expect(button).toBeDisplayed();
        await button.click();
    }

    /** Wait for a control, click it, and verify navigation to the expected URL. */
    public async clickAndVerifyRedirect(button: ChainablePromiseElement, url: string): Promise<void> {
        await expect(button).toBeDisplayed();
        await button.click();
        await expect(browser).toHaveUrl(expect.stringContaining(url));
    }

    public async verifyElementHasValue(element: ChainablePromiseElement, value: string): Promise<void> {
        await expect(element).toBeDisplayed();
        await expect(element).toHaveValue(value);
    }
}

export default new CommonHelper();
