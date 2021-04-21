# Platform.sh Action

[![Actions Status](https://github.com/adam7/platformsh-cli-action/workflows/Test%20workflow/badge.svg)](https://github.com/adam7/platformsh-cli-action/actions)

This Action sets up an environment with the Platform.sh CLI. 

## Inputs

### token

**Required** Your platform.sh API token, see https://docs.platform.sh/development/cli/api-tokens.html

### version

**Optional** The version of the CLI to install, defaults to latest

## Usage

See [action.yml](action.yml)

Basic:

    - uses: actions/checkout@v1
    - uses: adam7/platformsh-cli-action@v1.1
      with: 
        token: ${{secrets.PLATFORMSH_CLI_TOKEN}} #required

Specify CLI version:

    - uses: actions/checkout@v1
    - uses: adam7/platformsh-cli-action@v1.1
      with: 
        token: ${{secrets.PLATFORMSH_CLI_TOKEN}} #required
        version: v3.49.3

You will need to generate an API token and add it as a Secret with the name PLATFORMSH_CLI_TOKEN in your repository Settings.
