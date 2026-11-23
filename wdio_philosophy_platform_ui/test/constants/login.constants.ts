export const loginCredentials = {
    emailNewStudent: 'ui+1795182001705@example.com',
    emailStudentWithOverview: '1793711413768student@example.com',
    password: 'passDefault1!',
} as const;

export const password = loginCredentials.password;
export const studentNew = loginCredentials.emailNewStudent;
export const studentOverview = loginCredentials.emailStudentWithOverview;
