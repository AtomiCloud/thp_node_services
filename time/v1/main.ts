import {ILogger} from "./logger";
import express, {Express} from 'express';
import {DynamicConfig, LoadDynamicConfiguration} from "./dynamic_config";
import {staticConfig, StaticConfig} from "./static_config";
import {StatusController} from "./status";
import {StartServices} from "./controller";


function main(logger: ILogger, stc: StaticConfig, dyn: DynamicConfig): void {
    
    logger.trace('initializing express application');
    const app: Express = express()
    const port = 3000;
    logger.trace('express application initialized');
    
    logger.trace('computing starting timestamp');
    const startTime = Date.now();
    logger.trace('starting timestamp registered:', startTime);
    
    // Status
    StatusController(app, logger, startTime, stc, dyn);
    // Actual Controller
    StartServices(app, logger, startTime, stc, dyn);
    
    app.listen(port, () => {
        logger.info(`listening at http://0.0.0.0:${port}`)
    })
    
    
    process.on('SIGTERM', () => {
        logger.info('SIGTERM terminating...')
        process.exit(0);
    });
    
    process.on('SIGINT', () => {
        logger.info('SIGINT terminating...')
        process.exit(0);
    });
    
}

const dynConfig = LoadDynamicConfiguration(staticConfig);

main(dynConfig.logger, staticConfig, dynConfig);
