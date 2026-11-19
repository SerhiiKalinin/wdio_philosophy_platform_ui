import RegistrationPage from '../pageobjects/registration.page.js';

class RegistrationHelper {
    /** Create an address unique to this run and suitable for reuse across a user story. */
    public createUniqueEmail(): string {
        return `ui+${Date.now()}@example.com`;
    }

    /** Submit a valid registration using the registration page object locators. */
    public async submitValidRegistration(email: string, password: string): Promise<void> {
        await RegistrationPage.emailInput.setValue(email);
        await RegistrationPage.passwordInput.setValue(password);
        await RegistrationPage.passwordConfirmationInput.setValue(password);
        await RegistrationPage.submitButton.click();
    }
}

export default new RegistrationHelper();
