import * as process from "process";
import * as cp from "child_process";
import * as path from "path";

// shows how the runner will run a javascript action with env / stdout protocol
test("test runs", () => {
  process.env["PLATFORMSH_CLI_TOKEN"] = "latest";
  const ip = path.join(__dirname, "..", "lib", "main.js");
  const options: cp.ExecSyncOptions = {
    env: process.env,
  };

  // TODO: Test running the action - no more curl etc.
  // console.log(cp.execSync(`node ${ip}`, options).toString());
});
