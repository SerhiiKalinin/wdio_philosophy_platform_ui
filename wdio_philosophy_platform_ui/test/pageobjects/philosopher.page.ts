import { $ } from '@wdio/globals';

class PhilosopherPage {
    public get page() {
        return $('//*[@data-testid="public-philosopher-page"]');
    }

    public get followButton(){
        return $('//*[@data-testid="public-philosopher-follow-button"]');
    }

    public get followingButton(){
        return $('//*[@data-testid="public-philosopher-following-button"]');
    }    
}

export default new PhilosopherPage();