import { $ } from '@wdio/globals';

class SettingsPage {
    public get page() {
        return $('//*[@data-testid="settings-page"]');
    } 

    public get nameInput(){
        return $('//*[@data-testid="settings-name-field"]');
    }

    public get deleteAccountButton(){
        return $('//*[@data-testid="settings-delete-account-button"]');
    }

    public get deleteConfirmationModal(){
        return $('//*[@data-testid="settings-delete-confirmation-dialog"]');
    }

    public get confirmDeleteAccountButton(){
        return $('//*[@data-testid="settings-delete-confirmation-confirm"]');
    }
}

export default new SettingsPage();