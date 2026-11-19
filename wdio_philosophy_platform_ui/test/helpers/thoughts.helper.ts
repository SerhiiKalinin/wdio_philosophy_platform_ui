import ThoughtsPage from '../pageobjects/thoughts.page.js';

class ThoughtsHelper {
    /** Read the philosopher ID from the first post card's link. */
    public async getFirstPhilosopherId(): Promise<string> {
        const href = await ThoughtsPage.firstPhilosopherPostCard.getAttribute('href');
        const philosopherId = href?.match(/\/philosopher\/([^/?#]+)/)?.[1];

        if (!philosopherId) {
            throw new Error('Could not read a philosopher ID from the first Thoughts post card');
        }

        return philosopherId;
    }
}

export default new ThoughtsHelper();
