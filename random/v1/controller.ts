import "colors"
import {DynamicConfig} from "./dynamic_config";
import {StaticConfig} from "./static_config";
import {Express} from "express";

function GetRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function StartServices(app: Express, _: number,
                       __: StaticConfig,
                       dyn: DynamicConfig) {
    
    dyn.logger.trace('GET `/random` endpoint registered');
    app.get('/random', (_, res) => {
        const logger = dyn.logger
        logger.info('hit `/random`');
        
        logger.trace(`generating random int between ${dyn.cfg.random_range.start.toString().red} and ${dyn.cfg.random_range.end.toString().red}`);
        const int = GetRandomInt(dyn.cfg.random_range.start, dyn.cfg.random_range.end);
        logger.trace(`random int generated: ${int.toString().red}`);
        
        res.send({
            int,
        });
    })
    dyn.logger.trace('GET `/random` endpoint registered');
}

export {StartServices}
