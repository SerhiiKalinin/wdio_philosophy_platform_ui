import { $ } from '@wdio/globals';

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
}

export default new Header();
