import {Exit} from "./util";

const version = 'v2';
const commitSha = 'be4c610cad40881dfff12b4d7043f8669504e72c';
const service = 'atomi.core.db';

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
