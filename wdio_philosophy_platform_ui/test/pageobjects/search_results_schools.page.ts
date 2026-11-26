import { $ } from '@wdio/globals';
import { $$ } from '@wdio/globals';

class SearchResultsSchoolsPage {
    public get page() {
        return $('//*[@data-testid="public-search-page"]');
    }

    public get schoolCards(){
        return $$('//*[@class="philosopher-card school-card"]');
    }

    public get schoolCardsNames(){
        return $$('//*[@class="philosopher-card__name"]');
    }

    public get queryChipClearButton(){
        return $('//*[@data-testid="public-search-query-clear"]');
    }

    public get schoolsTabButton(){
        return $('//*[@data-testid="public-search-filter-schools"]');
    }
}

export default new SearchResultsSchoolsPage();