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
    // public async clickAndVerifyRedirect(button: ChainablePromiseElement, url: string): Promise<void> {
    //     await expect(button).toBeDisplayed();
    //     await button.click();
    //     allureReporter.addStep(`LOG: Element was clicked`);
    //     await expect(browser).toHaveUrl(expect.stringContaining(url));
    //     allureReporter.addStep(`LOG: User redirected to '${url}' page`);
    // }

    public async clickAndVerifyRedirect(button: ChainablePromiseElement, urls: string | string[]): Promise<void> {
        await expect(button).toBeDisplayed();
        await button.click();
        allureReporter.addStep(`LOG: Element was clicked`);
        const expectedUrls = Array.isArray(urls) ? urls : [urls];
        for (const url of expectedUrls) {
            await expect(browser).toHaveUrl(expect.stringContaining(url));
        }
        allureReporter.addStep(`LOG: User redirected to a page whose URL contains '${expectedUrls.join(', ')}'`);
    }

    public async submitWithEnterAndVerifyRedirect(urls: string | string[]): Promise<void> {
        await browser.keys('Enter');
        allureReporter.addStep(`LOG: "Enter" clicked on keyboard`);
        const expectedUrls = Array.isArray(urls) ? urls : [urls];
        for (const url of expectedUrls) {
            await expect(browser).toHaveUrl(expect.stringContaining(url));
        }
        allureReporter.addStep(`LOG: User redirected to a page whose URL contains '${expectedUrls.join(', ')}'`);
    }

    public async verifyElementHasValue(element: ChainablePromiseElement, value: string): Promise<void> {
        await expect(element).toBeDisplayed();
        allureReporter.addStep(`LOG: Element is displayed`);
        await expect(element).toHaveValue(value);
        allureReporter.addStep(`LOG: Element has value='${value}'`);
    }

    public async verifyElementHasText(element: ChainablePromiseElement, text: string): Promise<void> {
        await expect(element).toBeDisplayed();
        allureReporter.addStep(`LOG: Element is displayed`);
        const actualText = (await element.getText()).trim().toLowerCase();
        expect(actualText).toEqual(text.trim().toLowerCase());
        allureReporter.addStep(`LOG: Element has text='${text}'`);
    }

    public async verifyElementStartsWithText(element: ChainablePromiseElement, text: string): Promise<void> {
        await expect(element).toBeDisplayed();
        allureReporter.addStep(`LOG: Element is displayed`);
        const actualText = (await element.getText()).trim().toLowerCase();
        const expectedText = text.trim().toLowerCase();
        expect(actualText.startsWith(expectedText)).toBe(true);
        allureReporter.addStep(`LOG: Element starts with text='${text}'`);
    }

    public async verifyElementContainsText(element: WebdriverIO.Element, text: string): Promise<void> {
        await expect(element).toBeDisplayed();
        allureReporter.addStep(`LOG: Element is displayed`);
        const actualText = (await element.getText()).trim().toLowerCase();
        const expectedText = text.trim().toLowerCase();
        expect(actualText.includes(expectedText)).toBe(true);
        allureReporter.addStep(`LOG: Element contains text='${text}'`);
    }

    public async typeText(element: ChainablePromiseElement, text: string) {
    for (const char of text) {
        await element.addValue(char);
        allureReporter.addStep(`LOG: character "${char}" added in input`);
    }
}
}

export default new CommonHelper();
