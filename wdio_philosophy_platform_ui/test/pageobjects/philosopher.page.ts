import { $ } from '@wdio/globals';

class PhilosopherPage {
    public get page() {
        return $('//*[@data-testid="public-philosopher-page"]');
    }
}

export default new PhilosopherPage();