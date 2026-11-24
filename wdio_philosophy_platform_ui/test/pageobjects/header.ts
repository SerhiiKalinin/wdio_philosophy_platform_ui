import { $ } from '@wdio/globals';
import { $$ } from '@wdio/globals';

class Header {
    public get logoutButton() {
        return $('//*[@data-testid="site-header-logout-button"]');
    }

    public get thoughtsLink() {
        return $('//*[@data-testid="site-header-thoughts-link"]');
    }   

    public get overviewLink() {
        return $('//*[@data-testid="site-header-overview-link"]');
    }

    public get settingsLink() {
        return $('//*[@data-testid="site-header-settings-link"]');
    }

    public get searchButton(){
        return $('//*[@data-testid="site-header-search-open-desktop"]');
    }

    public get searchInput(){
        return $('//*[@data-testid="site-header-search-input-desktop"]');
    }

    public get searchLoading(){
        return $('//*[@data-testid="site-header-suggestions-loading-desktop"]');
    }

    public get searchNoResults(){
        return $('//*[@data-testid="site-header-suggestions-empty-desktop"]');
    }

    public get suggestionsPhilosophersList(){
        return $('//*[@data-testid="site-header-philosopher-suggestions-desktop"]');
    }

    public get suggestionsSchoolsList(){
        return $('//*[@data-testid="site-header-school-suggestions-desktop"]');
    }

    public get philosophersSuggestionOptions(){
        return $$('//*[contains(@data-testid, "site-header-philosopher-suggestion-desktop-")]')
    }

    public get schoolsSuggestionOptions(){
        return $$('//*[contains(@data-testid, "site-header-school-suggestion-desktop-")]')
    }
}

export default new Header();
