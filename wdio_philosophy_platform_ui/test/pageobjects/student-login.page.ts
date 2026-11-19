import { $ } from '@wdio/globals';

class StudentLoginPage {
    public get emailInput() {
        return $('//*[@data-testid="login-email-input"]');
    }

    public get passwordInput() {
        return $('//*[@data-testid="login-password-input"]');
    }

    public get submitButton() {
        return $('//*[@data-testid="login-submit-button"]');
    }
}

export default new StudentLoginPage();
