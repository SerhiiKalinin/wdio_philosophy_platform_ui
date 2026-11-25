/** Relative routes for pages used by the test suites. */
export const pages = {
    login: '/login',
    secure: '/secure',
    registration: '/?register=1#registration-email-field',
    overview: '/overview',
    thoughts: '/posts',
    settings: '/settings',
    search: '/search',
    philosopher: (id: string | number) => `/philosopher/${id}`,
    school: (id: string | number) => `/school/${id}`,
} as const;

export type PageName = Exclude<keyof typeof pages, 'philosopher' | 'school'>;