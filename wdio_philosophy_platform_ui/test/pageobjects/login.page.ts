import { $ } from '@wdio/globals';

class LoginPage {
    public get page() {
        return $('//*[@data-testid="login-page"]');
    }

    public get emailInput() {
        return $('//*[@data-testid="login-email-input"]');
    }

    public get passwordInput() {
        return $('//*[@data-testid="login-password-input"]');
    }

    public get submitButton() {
        return $('//*[@data-testid="login-submit-button"]');
    }

    public get wrongCredentialsError(){
        return $('//*[@data-testid="login-error"]');
    }
}

export default new LoginPage();
