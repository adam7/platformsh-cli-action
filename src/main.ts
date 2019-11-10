import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function run() {
  try {
    const token = core.getInput('token');
    const version = core.getInput('version');

    // Download the latest platform CLI release
    await exec.exec(`curl -L ${buildUrl(version)}  -o platform`);
    // Make it executable
    await exec.exec("chmod +x platform");
    // Move it to the user's /bin 
    await exec.exec("sudo mv platform /usr/local/bin/platform");

    // Set the platform token as a top level environment variable
    core.exportVariable('PLATFORMSH_CLI_TOKEN', token);

  } catch (error) {
    core.setFailed(error.message);
  }
}

function buildUrl(version: String):String{
  const rootUrl = "https://github.com/platformsh/platformsh-cli/releases/";

  return `${rootUrl}${version}/platform.phar`;
}

run();
