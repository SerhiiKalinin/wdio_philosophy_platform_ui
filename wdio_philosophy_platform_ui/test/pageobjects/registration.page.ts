import { $ } from '@wdio/globals';

class RegistrationPage {
    public get emailInput() {
        return $('//*[@data-testid="registration-email-input"]');
    }

    public get passwordInput() {
        return $('//*[@data-testid="registration-password-input"]');
    }

    public get passwordConfirmationInput() {
        return $('//*[@data-testid="registration-password-confirmation-input"]');
    }

    public get submitButton() {
        return $('//*[@data-testid="registration-submit"]');
    }

    public get successState() {
        return $('//*[@data-testid="registration-funnel-success"]');
    }

    public get successHeading() {
        return $('//*[@data-testid="registration-success-heading"]');
    }

    public get redirectMessage() {
        return $('//*[@data-testid="registration-success-redirect-message"]');
    }
}

export default new RegistrationPage();
