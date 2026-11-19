import { $ } from '@wdio/globals';

class ThoughtsPage {
    public get page() {
        return $('//*[@data-testid="public-posts-page"]');
    }

    public get firstPhilosopherPostCard() {
        return $('//*[@data-testid="public-posts-page"]//a[contains(@href, "/philosopher/")]');
    }
}

export default new ThoughtsPage();
