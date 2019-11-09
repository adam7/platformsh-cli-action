# Platform.sh Action
A GitHub Action that allows you to use the Platform.sh CLI in your workflows. 

## Inputs

### 'token'

**Required** Your platform.sh API token, see https://docs.platform.sh/development/cli/api-tokens.html

## Example usage

    uses: adam7/platformsh-action
      with: 
        token: ${{secrets.PLATFORMSH_CLI_TOKEN}} #required