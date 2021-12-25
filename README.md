# NovelRtContributors

**Method**: `GET /`

Returns contributors in the NovelRT org with contributions summed across all org repos.

## Deployment

Set the following environment variables in `local.settings.json` (for local deployment) or in Azure portal (for prod deployment).

For instructions how to do that see: https://docs.microsoft.com/en-us/azure/azure-functions/functions-how-to-use-azure-function-app-settings

### `GITHUB_APP_ID`

This is the GitHub App ID

### `GITHUB_INSTALLATION_ID`

The ID of the installation of the GitHub App in NovelRT org

### `GITHUB_API_KEY`

The `.pem` private key for for the app with newlines replaced with literal `\n`.

Helpful command so you can just copy-paste the string:

`awk '{printf "%s\\n", $0}' key.pem`
