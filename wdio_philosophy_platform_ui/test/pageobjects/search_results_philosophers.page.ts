import { $ } from '@wdio/globals';
import { $$ } from '@wdio/globals';

class SearchResultsPhilosophersPage {
    public get page() {
        return $('//*[@data-testid="public-search-page"]');
    }

    public get philosopherCards(){
        return $$('//*[@class="philosopher-card"]');
    }

    public get philosopherCardsNames(){
        return $$('//*[@class="philosopher-card__name"]');
    }

    public get queryChipClearButton(){
        return $('//*[@data-testid="public-search-query-clear"]');
    }
}

export default new SearchResultsPhilosophersPage();