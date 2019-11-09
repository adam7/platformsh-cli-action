import * as core from '@actions/core';
import * as exec from '@actions/exec';
import { wait } from './wait'

async function run() {
  try {
    const token = core.getInput('token');

    // Download the latest platform CLI release
    await exec.exec("curl -L https://github.com/platformsh/platformsh-cli/releases/latest/download/platform.phar  -o platform");
    // Make it executable
    await exec.exec("chmod +x platform");
    // Move it so it to the user's /bin 
    await exec.exec("sudo mv platform /usr/local/bin/platform");

    // Set the platform token as a top level environment variable
    // await exec.exec(`sudo export PLATFORMSH_CLI_TOKEN="${token}"`);
    core.exportVariable('PLATFORMSH_CLI_TOKEN', token);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
