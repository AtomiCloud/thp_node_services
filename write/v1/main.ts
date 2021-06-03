import express, {Express} from 'express';
import {DynamicConfig, LoadDynamicConfiguration} from "./dynamic_config";
import {staticConfig, StaticConfig} from "./static_config";
import {StatusController} from "./status";
import {StartServices} from "./controller";
import * as fs from "fs";


function main(stc: StaticConfig, dyn: DynamicConfig): void {
    
    dyn.logger.trace('initializing express application');
    const app: Express = express()
    const port = 3000;
    dyn.logger.trace('express application initialized');
    
    dyn.logger.trace('computing starting timestamp');
    const startTime = Date.now();
    dyn.logger.trace('starting timestamp registered:', startTime);
    
    // Status
    StatusController(app, startTime, stc, dyn);
    // Actual Controller
    StartServices(app, startTime, stc, dyn);
    
    app.listen(port, () => {
        dyn.logger.info(`listening at http://0.0.0.0:${port}`)
    })
    
    
    process.on('SIGTERM', () => {
        dyn.logger.info('SIGTERM terminating...')
        process.exit(0);
    });
    
    process.on('SIGINT', () => {
        dyn.logger.info('SIGINT terminating...')
        process.exit(0);
    });
    
}

let dynConfig = LoadDynamicConfiguration(staticConfig);


function ReloadConfiguration(): string {
    dynConfig.logger.info('configuration reloaded');
    const newDyn = LoadDynamicConfiguration(staticConfig);
    dynConfig.logger = newDyn.logger;
    dynConfig.cfg = newDyn.cfg;
    dynConfig.logLevel = newDyn.logLevel;
    dynConfig.secret = newDyn.secret;
    return newDyn.cfg.secret_key_path
}


let watcher = fs.watch(dynConfig.cfg.secret_key_path, () => {
    ReloadConfiguration();
})

fs.watch(staticConfig.configPath, () => {
    
    const secretPath = ReloadConfiguration();
    watcher.close();
    watcher = fs.watch(secretPath, () => {
        ReloadConfiguration();
    });
    
})

main(staticConfig, dynConfig);
