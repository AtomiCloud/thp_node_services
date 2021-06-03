import {Exit} from "./util";

const version = 'v1';
const commitSha = '01c62e9eea33d2cac4a0db42604af7ef5e163a67';
const service = 'atomi.core.time';

interface StaticConfig {
    version: string,
    commitSha: string,
    service: string,
    env: string,
    configPath: string,
}

const env = process.env.ENV?.toLowerCase();
const configPath = process.env.CONFIG_PATH;

if (env !== "dev" && env !== "prod") Exit("ENV either not set, or not `dev` or `prod`");
if (!configPath) Exit("CONFIG_PATH not set")


const staticConfig: StaticConfig = {
    version,
    commitSha,
    service,
    env,
    configPath,
}
export {
    staticConfig,
    StaticConfig,
}
