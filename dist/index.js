"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
//import functions files
const color_1 = require("./util/color");
const ua_gen_1 = require("./util/ua-gen");
//start main
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const select = prompt("Wourld you like to clear validProxies.txt?[y/n]> ");
        switch (select) {
            //y
            case "y":
                fs_1.default.writeFileSync("data/validProxies.txt", "", "utf-8");
                break;
            //n
            case "n":
                break;
            //default
            default:
                console.log("fuck you!");
                return;
                break;
        }
        //countors
        let validCountor = 0;
        let invalidCountor = 0;
        let timeoutCountor = 0;
        const proxies = fs_1.default.readFileSync("data/unknownProxies.txt", "utf-8").toString().split("\n");
        const checkPromise = proxies.map((proxy) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get("https://example.com/", {
                    headers: {
                        "User-Agent": (0, ua_gen_1.UAGen)().trim(),
                    },
                });
                if (response.status === 200) {
                    console.log(`[${color_1.color.green}VALID${color_1.color.white}]`, proxy);
                    fs_1.default.appendFileSync("data/validProxies.txt", `${proxy}\n`, "utf-8");
                    validCountor++;
                }
                else {
                    console.log(`[${color_1.color.red}INVALID${color_1.color.white}]`, proxy);
                    invalidCountor++;
                }
            }
            catch (error) {
                if (error.code === "ECONNABORTED") {
                    console.log(`${proxy.trim()} ${color_1.color.yellow}is time out.${color_1.color.white}`);
                    timeoutCountor++;
                }
                else {
                    console.log(`[${color_1.color.red}INVALID${color_1.color.white}]`, proxy);
                    invalidCountor++;
                }
            }
        }));
        yield Promise.all(checkPromise);
        console.log("✓checked all proxies.");
        console.log("Valid:", validCountor);
        console.log("Invalid:", invalidCountor);
        console.log("Timeout:", timeoutCountor);
        process.stdin.resume();
    });
}
