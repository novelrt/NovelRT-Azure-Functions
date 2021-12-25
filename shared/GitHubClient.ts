import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/rest";

export interface IGitHubClient {
    getAllRepositories(): Promise<any>;
    // eslint-disable-next-line no-unused-vars
    getNonAnonContributorsForRepo(name: string): Promise<any[]>;
}

class GitHubClient implements IGitHubClient {
    private octokit: Octokit;

    private orgName: string;

    constructor() {
        this.orgName = "novelrt";
        this.octokit = new Octokit({
            authStrategy: createAppAuth,
            auth: {
                appId: process.env.GITHUB_APP_ID,
                privateKey: process.env.GITHUB_API_KEY,
                installationId: process.env.GITHUB_INSTALLATION_ID,
            },
        });
    }

    async getAllRepositories(): Promise<any[]> {
        const { data } = await this.octokit.request(
            `GET /orgs/${this.orgName}/repos`
        );

        return data;
    }

    async getNonAnonContributorsForRepo(name: string): Promise<any[]> {
        const { data } = await this.octokit.request(
            `GET /repos/${this.orgName}/${name}/contributors?anon=false`
        );

        return data;
    }
}

export default GitHubClient;
