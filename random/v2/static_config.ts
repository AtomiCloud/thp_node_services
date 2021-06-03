import {Exit} from "./util";

const version = 'v2';
const commitSha = '23f3bb4243f0f76edfe5c4c9ac764ec538398247';
const service = 'atomi.core.random';

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
