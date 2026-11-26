import { $ } from '@wdio/globals';

class SchoolPage {
    public get page() {
        return $('//*[@data-testid="public-school-page"]');
    }

    public get schoolName(){
        return $('//*[@data-testid="public-school-title"]');
    }

    public get followButton(){
        return $('//*[@data-testid="public-school-follow-button"]');
    }

    public get followingButton(){
        return $('//*[@data-testid="public-school-following-button"]');
    }    
}

export default new SchoolPage();