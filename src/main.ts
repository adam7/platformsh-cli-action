import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as toolsCache from '@actions/tool-cache';
import * as io from '@actions/io';

async function run() {
  try {
    const token = core.getInput('token');
    const version = core.getInput('version');

    const url = buildUrl(version);

    // Download the latest platform CLI release
    // await exec.exec(`curl -L ${url} -o platform`);
    const platformPath = await toolsCache.downloadTool(url);
        
    // Make it executable
    // await exec.exec("chmod +x platform");
    
    // Move it to the user's /bin 
    // await exec.exec("sudo mv platform /usr/local/bin/platform");
    
    await io.mv(platformPath, "/usr/local/bin/platform");
    
    // Set the platform token as a top level environment variable
    core.exportVariable('PLATFORMSH_CLI_TOKEN', token);

  } catch (error) {
    core.setFailed(error.message);
  }
}

function buildUrl(version: string):string{
  const rootUrl = "https://github.com/platformsh/platformsh-cli/releases/";

  return `${rootUrl}${version}/download/platform.phar`;
}

run();
