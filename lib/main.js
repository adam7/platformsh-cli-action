"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = core.getInput('token');
            const version = core.getInput('version');
            const url = buildUrl(version);
            // Download the latest platform CLI release
            yield exec.exec(`curl -L ${url} -o platform`);
            // Make it executable
            yield exec.exec("chmod +x platform");
            // Move it to the user's /bin 
            yield exec.exec("sudo mv platform /usr/local/bin/platform");
            // Set the platform token as a top level environment variable
            core.exportVariable('PLATFORMSH_CLI_TOKEN', token);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
function buildUrl(version) {
    const rootUrl = "https://github.com/platformsh/platformsh-cli/releases/";
    return `${rootUrl}${version}/download/platform.phar`;
}
run();
