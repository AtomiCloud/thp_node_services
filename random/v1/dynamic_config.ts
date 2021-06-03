import {StaticConfig} from "./static_config";
import {ILogger, Logger} from "./logger";
import {ConfigFile, LoadConfigFile} from "./configFile";
import {LoadSecret} from "./secret";

interface DynamicConfig {
    logger: ILogger;
    cfg: ConfigFile;
    logLevel: 0 | 1 | 2;
    secret: string;
}


function LoadDynamicConfiguration({version, service, configPath}: StaticConfig): DynamicConfig {
    
    const cfg = LoadConfigFile(configPath);
    
    const logLevel = cfg.logs == "debug" ? 0 : cfg.logs == 'info' ? 1 : 2;
    console.log(`Log level is ${cfg.logs}`)
    
    if (logLevel == 0) {
        console.log(service.cyan, version.green, "loaded configuration")
        console.log(service.cyan, version.green, cfg);
        console.log(service.cyan, version.green, "initializing logger")
    }
    
    const logger = new Logger(logLevel, service, version);
    
    const secret = LoadSecret(logger, cfg.secret_key_path)
    
    return {cfg, logLevel, logger, secret};
}

export {LoadDynamicConfiguration, DynamicConfig}
