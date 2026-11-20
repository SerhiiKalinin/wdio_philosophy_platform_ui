import { $ } from '@wdio/globals';

class Header {
    public get logoutButton() {
        return $('//*[@data-testid="site-header-logout-button"]');
    }
}

export default new Header();
