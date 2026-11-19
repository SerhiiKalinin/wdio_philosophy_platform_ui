/** Relative routes for pages used by the test suites. */
export const pages = {
    login: '/login',
    secure: '/secure',
    registration: '/?register=1#registration-email-field',
    overview: '/overview',
    thoughts: '/posts',
    philosopher: (id: string | number) => `/philosopher/${id}`,
} as const;

export type PageName = Exclude<keyof typeof pages, 'philosopher'>;
