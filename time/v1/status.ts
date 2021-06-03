import {ILogger} from "./logger";
import {Express} from "express";
import {StaticConfig} from "./static_config";
import {DynamicConfig} from "./dynamic_config";


function StatusController(app: Express, logger: ILogger, startTime: number,
                          {version, service, commitSha, env, configPath}: StaticConfig,
                          {cfg, logLevel, secret}: DynamicConfig) {
    
    
    logger.trace('registering GET `/` endpoint');
    app.get("/", (_, res) => {
        logger.info('obtaining status status');
        
        logger.trace('computing time elapsed');
        const aliveDuration = Date.now() - startTime;
        logger.trace('time elapsed computed');
        
        logger.trace('generating status object');
        const status: any = {
            version,
            commitSha,
            startTime,
            aliveDuration,
            env,
            service,
            configPath,
            logLevel,
        }
        
        if (env.toLowerCase().substring(0, 3) == "dev") {
            logger.trace('injecting secret to status since its in development environment');
            status['secret'] = secret;
            status['secretPath'] = cfg.secret_key_path
        }
        res.send(JSON.stringify(status))
        
    })
    logger.trace('GET `/` endpoint registered');
    
}

export {StatusController}
