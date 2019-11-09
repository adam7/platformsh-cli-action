import * as core from '@actions/core';
import * as exec from '@actions/exec';
import { wait } from './wait'

async function run() {
  try {
    const ms = core.getInput('milliseconds');
    console.log(`Waiting ${ms} milliseconds ...`)

    core.debug((new Date()).toTimeString())
    await wait(parseInt(ms, 10));
    core.debug((new Date()).toTimeString())

    // Download the latest platform CLI release
    await exec.exec("curl -L https://github.com/platformsh/platformsh-cli/releases/latest/download/platform.phar  -o platform");
    // Make it executable
    await exec.exec("chmod +x platform");
    // Move it so it's available 
    await exec.exec("sudo mv platform /usr/local/bin/platform");
    // try something
    await exec.exec("platform list");


    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
