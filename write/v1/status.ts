import {Express} from "express";
import {StaticConfig} from "./static_config";
import {DynamicConfig} from "./dynamic_config";


function StatusController(app: Express, startTime: number,
                          {version, service, commitSha, env, configPath}: StaticConfig,
                          dyn: DynamicConfig) {
    dyn.logger.trace('registering GET `/` endpoint');
    app.get("/", (_, res) => {
        const logger = dyn.logger;
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
            logLevel: dyn.logLevel,
        }
        
        if (env.toLowerCase().substring(0, 3) == "dev") {
            logger.trace('injecting secret to status since its in development environment');
            status['secret'] = dyn.secret;
            status['secretPath'] = dyn.cfg.secret_key_path
            logger.trace('secrets injected');
        }
        res.send(JSON.stringify(status))
        
    })
    dyn.logger.trace('GET `/` endpoint registered');
    
}

export {StatusController}
