import { $ } from '@wdio/globals';

class ThoughtsPage {
    public get page() {
        return $('//*[@data-testid="public-posts-page"]');
    }

    public get philosopherPostCardsGrid() {
        return $('//*[@data-testid="public-posts-cards"]');
    }

    philosopherCard(index: number) {
        return $(`//*[@data-testid="public-post-${index}-philosopher-link"]`);
    }
}

export default new ThoughtsPage();
