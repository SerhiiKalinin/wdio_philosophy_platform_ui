import { $ } from '@wdio/globals';

class OverviewPage {
    public get page() {
        return $('//*[@data-testid="overview-page"]');
    }

    public get title() {
        return $('//*[@data-testid="overview-title"]');
    }

    public get postsGrid() {
        return $('//*[@data-testid="overview-posts"]');
    }

    public get emptyStateQuote() {
        return $('//*[@data-testid="overview-empty-quote"]');
    }

    public get emptyStateCta() {
        return $('//*[@data-testid="overview-empty-action"]');
    }
}

export default new OverviewPage();
