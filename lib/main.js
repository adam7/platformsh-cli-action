"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
// import * as toolsCache from '@actions/tool-cache';
// import * as io from '@actions/io';
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = core.getInput("token");
            const version = core.getInput("version");
            const url = buildUrl(version);
            // Download the latest platform CLI release
            yield exec.exec(`curl -L ${url} -o platform`);
            // const platformPath = await toolsCache.downloadTool(url);
            // Make it executable
            yield exec.exec("chmod +x platform");
            // Move it to the user's /bin
            yield exec.exec("sudo mv platform /usr/local/bin/platform");
            // await io.mv(platformPath, "/usr/local/bin/platform");
            // Set the platform token as a top level environment variable
            core.exportVariable("PLATFORMSH_CLI_TOKEN", token);
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
