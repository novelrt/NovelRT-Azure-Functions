import GitHubClient from "../shared/GitHubClient";

export interface IContributor {
    id: number;
    login: number;
    htmlUrl: string;
    avatarUrl: string;
    contributions: number;
}

const client = new GitHubClient();

const get = async (): Promise<IContributor[]> => {
    const allRepos = await client.getAllRepositories();
    const totalContributors = new Map<number, IContributor>();

    // iterates over all the novelrt repos and sums up contributions for each contributor;
    for (const repo of allRepos) {
        const { name } = repo;

        // rationale: one iteration depends on another;
        // see: https://eslint.org/docs/rules/no-await-in-loop#when-not-to-use-it
        // eslint-disable-next-line no-await-in-loop
        const repoContributors = await client.getNonAnonContributorsForRepo(
            name
        );

        // eslint-disable-next-line no-restricted-syntax
        for (const repoContributor of repoContributors) {
            // rationale: github api uses this convention so we need to use it to access the objects;
            // eslint-disable-next-line camelcase
            const { id, contributions, login, html_url, avatar_url } =
                repoContributor;

            if (totalContributors.has(id)) {
                totalContributors.get(id).contributions += contributions;
            } else {
                const contributor: IContributor = {
                    id,
                    login,
                    // eslint-disable-next-line camelcase
                    htmlUrl: html_url,
                    // eslint-disable-next-line camelcase
                    avatarUrl: avatar_url,
                    contributions,
                };
                totalContributors.set(id, contributor);
            }
        }
    }

    return [...totalContributors.values()];
};

export default get;
