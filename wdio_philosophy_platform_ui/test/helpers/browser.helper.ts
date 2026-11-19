import { browser } from '@wdio/globals';
import { pages, type PageName } from '../pages.js';

/** Maps Mocha suite titles to the page that suite should start on. */
const suitePages: Record<string, PageName> = {
    'My Login application': 'login',
};

class BrowserHelper {
    /** Prepare a test run by opening the baseUrl or a path relative to it. */
    public async prepareTestRun(path = '/'): Promise<void> {
        await browser.url(path);
    }

    /** Open the configured starting page for a named test suite. */
    public async openPageForSuite(suiteName: string): Promise<void> {
        const pageName = suitePages[suiteName];

        if (!pageName) {
            return;
        }

        await browser.url(pages[pageName]);
    }

    /** Clear browser data while keeping the WDIO session usable by later tests. */
    public async clearSession(): Promise<void> {
        await browser.deleteCookies();
        await browser.execute(() => {
            window.localStorage.clear();
            window.sessionStorage.clear();
        });
    }

}

export default new BrowserHelper();
